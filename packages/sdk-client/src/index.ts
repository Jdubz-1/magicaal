export { MagiCaalClient } from './client';
export { AgentClient } from './agent-client';
export { RunHandleImpl } from './run-handle';
export { streamRun } from './stream-client';
export { HumanReviewClient } from './human-review-client';
export type { ReviewDetails } from './human-review-client';

export {
  MagiCaalError,
  AuthError,
  RateLimitError,
  RunFailedError,
  RunSuspendedError,
  ValidationError,
  AgentNotFoundError,
  NetworkError,
} from './errors';

export type { ValidationIssue } from './errors';

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
} from './types';
