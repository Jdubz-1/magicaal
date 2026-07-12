export { MagiCaalClient } from './client.js';
export { AgentClient, type AgentClientOptions } from './agent-client.js';
export { WebhookVerifier, WebhookVerificationError } from './webhook-verifier.js';
export type { WebhookVerifyOptions } from './webhook-verifier.js';
export { RunHandleImpl } from './run-handle.js';
export { streamRun } from './stream-client.js';
export { HumanReviewClient } from './human-review-client.js';
export type { ReviewDetails } from './human-review-client.js';
export { SessionClient } from './session-client.js';
export type { SessionSummary, SessionContext } from './session-client.js';
export { WorkspaceContextBuilder } from './workspace-context-builder.js';
export type { ContextSchemaDefinition, ContextMessage, ContextDocument } from './workspace-context-builder.js';

export {
  MagiCaalError,
  AuthError,
  RateLimitError,
  RunFailedError,
  RunSuspendedError,
  ValidationError,
  AgentNotFoundError,
  NetworkError,
} from './errors.js';

export type { ValidationIssue } from './errors.js';

export type {
  MagiCaalClientConfig,
  RetryConfig,
  AgentClientConfig,
  InvokeOptions,
  StartOptions,
  RunStatus,
  RunStep,
  RateLimitInfo,
  RunHandle,
  RunStreamEvent,
  RunStartedEvent,
  NodeStartedEvent,
  NodeCompletedEvent,
  NodeFailedEvent,
  RunCompletedEvent,
  RunFailedEvent,
  RunSuspendedEvent,
  AgentDescriptor,
} from './types.js';
