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
  // Guardrails & Review
  coreGuardrail,
  coreHumanReview,
  // Agentic routing
  coreAgenticRouter,
  // In-run memory
  coreMemoryRead,
  coreMemoryWrite,
];
