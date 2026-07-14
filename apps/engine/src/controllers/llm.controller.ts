import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import type { AgentGraphDefinition, CanonicalLLMRequest, ModelRouterConfig } from '@magicaal/core';
import { routedLLMCall } from '../router/router-engine';
import { resolveCredentials } from '../resolver/credential-resolver';
import { ExecutionContextImpl } from '../execution/context';

const DEFAULT_SUMMARIZE_PROMPT =
  'Summarize the following conversation/context entries into one concise record that preserves ' +
  'the facts, decisions, and open questions needed to continue the conversation. Respond with ' +
  'the summary text only.';

/**
 * POST /internal/llm/summarize (ALIGN-007). Session overflow summarization for
 * the API's Session Manager, which owns session persistence but has no LLM
 * path — the router engine, provider adapters, and credential resolution all
 * live here. Stateless: no run or step telemetry is recorded.
 */
export const summarizeItems: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId, items, model, prompt, routerConfig } = req.body as {
      tenantId?: string;
      items?: unknown[];
      model?: string;
      prompt?: string;
      routerConfig?: ModelRouterConfig;
    };

    if (!tenantId || !Array.isArray(items) || items.length === 0) {
      throw Object.assign(
        new Error('tenantId and a non-empty items array are required'),
        { status: 400, code: 'INVALID_SUMMARIZE_REQUEST' },
      );
    }
    if (!routerConfig || !Array.isArray(routerConfig.targets) || routerConfig.targets.length === 0) {
      throw Object.assign(
        new Error('No router config available for summarization'),
        { status: 422, code: 'ROUTER_NOT_CONFIGURED' },
      );
    }

    // summarizeWith.model overrides the target model; the caller's router
    // determines provider and credentials.
    const effective: ModelRouterConfig = model
      ? { ...routerConfig, targets: routerConfig.targets.map((t) => ({ ...t, model })) }
      : routerConfig;

    const ctx = new ExecutionContextImpl({
      runId: `summarize_${crypto.randomUUID()}`,
      agentId: '_session-summarize',
      tenantId,
      triggerType: 'internal',
      input: {},
    });

    // Credential resolution walks a graph definition — hand it a minimal one
    // carrying the router config so the targets' connections resolve.
    const syntheticGraph = {
      version: '1.0',
      name: '_session-summarize',
      entry: '_summarize',
      nodes: {
        _summarize: { id: '_summarize', type: 'core:llm-call', config: { router: effective } },
      },
      edges: [],
      toolEdges: [],
      workspaceEdges: [],
      config: { trigger: { type: 'rest', mode: 'async' } },
    } as unknown as AgentGraphDefinition;
    await resolveCredentials(syntheticGraph, ctx);

    const request: CanonicalLLMRequest = {
      system: prompt ?? DEFAULT_SUMMARIZE_PROMPT,
      messages: [{ role: 'user', content: JSON.stringify(items) }],
      maxTokens: 1024,
      metadata: { purpose: 'session-summarize', tenantId },
    };

    const response = await routedLLMCall(request, effective, ctx);
    res.json({ summary: response.content });
  } catch (err) {
    next(err);
  }
};
