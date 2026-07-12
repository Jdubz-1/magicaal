import * as crypto from 'node:crypto';
import type {
  ExecutionContext,
  IntegrationPackage,
  IntegrationTriggerHandler,
  NodeModule,
} from '@magicaal/sdk-node';
import { IntegrationError, errorFromResponse, resolveField } from '@magicaal/integration-core';

function token(ctx: ExecutionContext, connectionId: string): string {
  const creds = ctx.credentials[connectionId];
  const value = creds?.accessToken ?? creds?.apiKey;
  if (!value) {
    throw new IntegrationError({
      service: 'google-workspace',
      message: `google-workspace: no usable token for connection "${connectionId}"`,
      code: 'CONNECTION_NOT_RESOLVED',
      retryable: false,
    });
  }
  return value;
}

function fail(err: unknown) {
  if (err instanceof IntegrationError) {
    return {
      status: 'failed' as const,
      outputs: {},
      error: { code: err.code ?? 'GOOGLE_WORKSPACE_ERROR', message: err.message, retryable: err.retryable },
    };
  }
  throw err;
}

interface SheetsAppendConfig {
  connectionId: string;
  spreadsheetId: string;
  range: string;
  values: string[];
  outputKey: string;
}

export const sheetsAppendRow: NodeModule<SheetsAppendConfig> = {
  type: 'integration:google-workspace:sheets-append-row',
  meta: {
    name: 'Sheets: Append Row',
    description: 'Appends a row of values to a spreadsheet range. Writes {updatedRange} to outputKey.',
    category: 'integration',
    icon: 'table',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'spreadsheetId', 'range', 'values', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'google-workspace', description: 'Google Workspace Integration Connection' },
        spreadsheetId: { type: 'string', description: 'Spreadsheet ID from its URL. Supports JSONata expressions starting with $.' },
        range: { type: 'string', description: 'A1-notation range, e.g. Sheet1!A:C' },
        values: { type: 'array', items: { type: 'string' }, description: 'Cell values for the new row. Each supports JSONata expressions.' },
        outputKey: { type: 'string', description: 'Context key to write {updatedRange} to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { updatedRange: { type: 'string' } } },
  },
  async execute(ctx, config) {
    try {
      const accessToken = token(ctx, config.connectionId);
      const spreadsheetId = await resolveField(ctx, config.spreadsheetId);
      const values = await Promise.all(config.values.map((v) => resolveField(ctx, v)));

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(config.range)}:append?valueInputOption=USER_ENTERED`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [values] }),
      });
      if (!response.ok) throw await errorFromResponse('google-workspace', response);

      const data = (await response.json()) as { updates?: { updatedRange?: string } };
      const result = { updatedRange: data.updates?.updatedRange ?? '' };
      ctx.set(config.outputKey, result);
      return { status: 'complete' as const, outputs: { [config.outputKey]: result } };
    } catch (err) {
      return fail(err);
    }
  },
};

interface CalendarCreateEventConfig {
  connectionId: string;
  calendarId?: string;
  summary: string;
  startIso: string;
  endIso: string;
  description?: string;
  outputKey: string;
}

export const calendarCreateEvent: NodeModule<CalendarCreateEventConfig> = {
  type: 'integration:google-workspace:calendar-create-event',
  meta: {
    name: 'Calendar: Create Event',
    description: 'Creates a calendar event. Writes {id, htmlLink} to outputKey.',
    category: 'integration',
    icon: 'calendar',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'summary', 'startIso', 'endIso', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'google-workspace', description: 'Google Workspace Integration Connection' },
        calendarId: { type: 'string', description: 'Calendar ID (default: primary)' },
        summary: { type: 'string', description: 'Event title. Supports JSONata expressions starting with $.' },
        startIso: { type: 'string', description: 'Start time, RFC3339. Supports JSONata expressions.' },
        endIso: { type: 'string', description: 'End time, RFC3339. Supports JSONata expressions.' },
        description: { type: 'string', description: 'Event description. Supports JSONata expressions.' },
        outputKey: { type: 'string', description: 'Context key to write {id, htmlLink} to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { id: { type: 'string' }, htmlLink: { type: 'string' } } },
  },
  async execute(ctx, config) {
    try {
      const accessToken = token(ctx, config.connectionId);
      const summary = await resolveField(ctx, config.summary);
      const start = await resolveField(ctx, config.startIso);
      const end = await resolveField(ctx, config.endIso);
      const description = config.description !== undefined ? await resolveField(ctx, config.description) : undefined;

      const calendarId = config.calendarId ?? 'primary';
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            summary,
            start: { dateTime: start },
            end: { dateTime: end },
            ...(description !== undefined ? { description } : {}),
          }),
        },
      );
      if (!response.ok) throw await errorFromResponse('google-workspace', response);

      const data = (await response.json()) as { id: string; htmlLink: string };
      const result = { id: data.id, htmlLink: data.htmlLink };
      ctx.set(config.outputKey, result);
      return { status: 'complete' as const, outputs: { [config.outputKey]: result } };
    } catch (err) {
      return fail(err);
    }
  },
};

/**
 * Calendar push notifications use Google API watch channels: the channel
 * token set at watch registration is echoed in X-Goog-Channel-Token, and the
 * change kind arrives in X-Goog-Resource-State (sync/exists/not_exists).
 */
export const googleWorkspaceTrigger: IntegrationTriggerHandler = {
  service: 'google-workspace',
  verifySignature(_rawBody, headers, secret): boolean {
    const raw = headers['x-goog-channel-token'];
    const channelToken = Array.isArray(raw) ? raw[0] : raw;
    if (!channelToken) return false;
    const a = Buffer.from(channelToken);
    const b = Buffer.from(secret);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  },
  eventType(_payload, headers): string | undefined {
    const raw = headers['x-goog-resource-state'];
    return Array.isArray(raw) ? raw[0] : raw;
  },
};

export const GOOGLE_WORKSPACE_INTEGRATION: IntegrationPackage = {
  service: 'google-workspace',
  displayName: 'Google Workspace',
  description: 'Sheets, Calendar, Drive and Docs operations; trigger agents from Calendar change notifications.',
  version: '0.1.0',
  authType: 'oauth2',
  authSchema: {
    fields: [
      { key: 'access_token', label: 'Access Token', type: 'secret', required: true },
      { key: 'refresh_token', label: 'Refresh Token', type: 'secret', description: 'Enables automatic token refresh' },
    ],
    oauth: {
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/calendar.events',
      ],
    },
  },
  nodes: [sheetsAppendRow, calendarCreateEvent],
  trigger: googleWorkspaceTrigger,
};
