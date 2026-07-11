import type { NodeModule } from './node';

/** One field of an integration's credential schema (rendered in the Admin connection form). */
export interface IntegrationAuthField {
  key: string;
  label: string;
  type: 'string' | 'secret';
  required?: boolean;
  description?: string;
}

export interface IntegrationOAuthConfig {
  authorizationUrl: string;
  tokenUrl: string;
  scopes: string[];
}

export interface IntegrationAuthSchema {
  /** Fields stored (encrypted) in integration_connections.credentials_enc. */
  fields: IntegrationAuthField[];
  /** Present when authType is oauth2. */
  oauth?: IntegrationOAuthConfig;
}

/**
 * Inbound event handling for services that push webhooks. Implementations
 * live in each integration package; the engine invokes them when an event
 * arrives at /v1/triggers/integrations/[service]/[tenant-slug].
 */
export interface IntegrationTriggerHandler {
  service: string;
  /**
   * Validate the service's webhook signature over the raw request body.
   * `secret` is the per-registration signing secret stored at trigger
   * registration time.
   */
  verifySignature(
    rawBody: string,
    headers: Record<string, string | string[] | undefined>,
    secret: string,
  ): boolean;
  /**
   * Endpoint-verification handshakes (e.g. Slack url_verification). When a
   * response body is returned, the engine replies with it immediately and
   * does not dispatch any runs.
   */
  handshake?(payload: unknown): unknown | undefined;
  /**
   * Normalized event type used for eventFilter matching (e.g. "push",
   * "message.channels"). Undefined dispatches to all registrations.
   */
  eventType(
    payload: unknown,
    headers: Record<string, string | string[] | undefined>,
  ): string | undefined;
}

/**
 * The unit an integration package exports. The engine registers `nodes`
 * into the Node Registry and the package itself into the Integration
 * Registry at startup (or at hot-load for marketplace-installed packages).
 */
export interface IntegrationPackage {
  /** Service identifier matching integration_connections.service (e.g. "slack"). */
  service: string;
  displayName: string;
  description: string;
  version: string;
  authType: 'oauth2' | 'api_key';
  authSchema: IntegrationAuthSchema;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodes: NodeModule<any>[];
  trigger?: IntegrationTriggerHandler;
}
