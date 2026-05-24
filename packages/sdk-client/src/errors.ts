export class MagiCaalError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'MagiCaalError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class AuthError extends MagiCaalError {
  constructor(message = 'Authentication failed') {
    super(message, 'auth_error');
    this.name = 'AuthError';
  }
}

export class RateLimitError extends MagiCaalError {
  constructor(
    message = 'Rate limit exceeded',
    public readonly retryAfterMs?: number,
  ) {
    super(message, 'rate_limit');
    this.name = 'RateLimitError';
  }
}

export class RunFailedError extends MagiCaalError {
  constructor(
    public readonly runId: string,
    message = 'Run failed',
    public readonly failedAt?: string,
  ) {
    super(message, 'run_failed');
    this.name = 'RunFailedError';
  }
}

export class RunSuspendedError extends MagiCaalError {
  constructor(
    public readonly runId: string,
    public readonly reviewId: string,
    message = 'Run suspended — awaiting human review',
  ) {
    super(message, 'run_suspended');
    this.name = 'RunSuspendedError';
  }
}

export class ValidationError extends MagiCaalError {
  constructor(
    message = 'Validation failed',
    public readonly issues: ValidationIssue[] = [],
  ) {
    super(message, 'validation_error');
    this.name = 'ValidationError';
  }
}

export interface ValidationIssue {
  path: string;
  message: string;
  code?: string;
}

export class AgentNotFoundError extends MagiCaalError {
  constructor(public readonly agentId: string) {
    super(`Agent not found: ${agentId}`, 'agent_not_found');
    this.name = 'AgentNotFoundError';
  }
}

export class NetworkError extends MagiCaalError {
  constructor(
    message = 'Network error',
    public readonly cause?: unknown,
  ) {
    super(message, 'network_error');
    this.name = 'NetworkError';
  }
}
