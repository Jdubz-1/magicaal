import type { NodeModule } from '@magicaal/sdk-node';
import { coreStart } from './nodes/core-start';
import { coreEnd } from './nodes/core-end';
import { coreStop } from './nodes/core-stop';
import { coreCondition } from './nodes/core-condition';
import { coreRouter } from './nodes/core-router';
import { coreLog } from './nodes/core-log';
import { coreTransform } from './nodes/core-transform';
import { coreFilter } from './nodes/core-filter';
import { coreValidate } from './nodes/core-validate';
import { coreParse } from './nodes/core-parse';
import { coreAggregate } from './nodes/core-aggregate';
import { coreMetric } from './nodes/core-metric';
import { coreAnnotation } from './nodes/core-annotation';
import { coreWait } from './nodes/core-wait';
import { coreLoop } from './nodes/core-loop';
import { coreFork } from './nodes/core-fork';
import { coreJoin } from './nodes/core-join';
import { corePromptBuilder } from './nodes/core-prompt-builder';
import { coreLLMCall } from './nodes/core-llm-call';
import { coreStructuredExtract } from './nodes/core-structured-extract';
import { coreEmbedding } from './nodes/core-embedding';
import { coreGuardrail } from './nodes/core-guardrail';
import { coreHumanReview } from './nodes/core-human-review';
import { coreAgenticRouter } from './nodes/core-agentic-router';
import { coreMemoryRead } from './nodes/core-memory-read';
import { coreMemoryWrite } from './nodes/core-memory-write';
import { coreHttpRequest } from './nodes/core-http-request';
import { coreFileRead } from './nodes/core-file-read';
import { coreFileWrite } from './nodes/core-file-write';
import { coreWebSearch } from './nodes/core-web-search';
import { coreWebScrape } from './nodes/core-web-scrape';
import { coreDbQuery } from './nodes/core-db-query';
import { coreWebhookReceive } from './nodes/core-webhook-receive';
import { coreVectorSearch } from './nodes/core-vector-search';
import { coreCode } from './nodes/core-code';
// Phase 3 — Tool System & Advanced Agent Nodes
import { coreTool } from './nodes/core-tool';
import { coreToolCall } from './nodes/core-tool-call';
import { coreReact } from './nodes/core-react';
import { coreMcpClient } from './nodes/core-mcp-client';
import { corePlanner } from './nodes/core-planner';
import { coreReflection } from './nodes/core-reflection';
import { coreContextSummarize } from './nodes/core-context-summarize';
import { coreTokenBudget } from './nodes/core-token-budget';
import { coreSubGraph } from './nodes/core-sub-graph';
import { coreHandoff } from './nodes/core-handoff';
import { coreFanOut } from './nodes/core-fan-out';
import { coreReduce } from './nodes/core-reduce';
import { coreInputMap } from './nodes/core-input-map';
import { coreOutputMap } from './nodes/core-output-map';
import { coreEvaluate } from './nodes/core-evaluate';

export {
  coreStart, coreEnd, coreStop, coreCondition, coreRouter,
  coreLog,
  coreTransform, coreFilter, coreValidate, coreParse, coreAggregate,
  coreMetric, coreAnnotation,
  coreWait, coreLoop, coreFork, coreJoin,
  corePromptBuilder,
  coreLLMCall, coreStructuredExtract, coreEmbedding,
  coreGuardrail, coreHumanReview,
  coreAgenticRouter,
  coreMemoryRead, coreMemoryWrite,
  coreHttpRequest, coreFileRead, coreFileWrite,
  coreWebSearch, coreWebScrape,
  coreDbQuery,
  coreWebhookReceive,
  coreVectorSearch,
  coreCode,
  // Phase 3
  coreTool, coreToolCall, coreReact, coreMcpClient,
  corePlanner, coreReflection, coreContextSummarize, coreTokenBudget,
  coreSubGraph, coreHandoff, coreFanOut, coreReduce, coreInputMap, coreOutputMap,
  coreEvaluate,
};
export { evaluate, evaluateBoolean, evaluateString } from './utils/jsonata';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ALL_NODES: NodeModule<any>[] = [
  // Core control flow
  coreStart,
  coreEnd,
  coreStop,
  coreCondition,
  coreRouter,
  coreLoop,
  coreFork,
  coreJoin,
  coreWait,
  // Data
  coreTransform,
  coreFilter,
  coreValidate,
  coreParse,
  coreAggregate,
  // Observability
  coreLog,
  coreMetric,
  coreAnnotation,
  // AI/LLM
  corePromptBuilder,
  coreLLMCall,
  coreStructuredExtract,
  coreEmbedding,
  coreVectorSearch,
  // Phase 3 AI/LLM
  corePlanner,
  coreReflection,
  coreContextSummarize,
  coreTokenBudget,
  // Tool system
  coreTool,
  coreToolCall,
  coreReact,
  coreMcpClient,
  // Guardrails & Review
  coreGuardrail,
  coreHumanReview,
  // Agentic routing
  coreAgenticRouter,
  // In-run memory
  coreMemoryRead,
  coreMemoryWrite,
  // Integration
  coreHttpRequest,
  coreFileRead,
  coreFileWrite,
  coreWebSearch,
  coreWebScrape,
  coreDbQuery,
  coreWebhookReceive,
  // Composition
  coreSubGraph,
  coreHandoff,
  coreFanOut,
  coreReduce,
  coreInputMap,
  coreOutputMap,
  // Evaluation
  coreEvaluate,
  // Code
  coreCode,
];
