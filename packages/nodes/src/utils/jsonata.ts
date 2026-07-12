import jsonata, { type Expression } from 'jsonata';

/**
 * Default bound on a single JSONata evaluation.
 *
 * JSONata runs on the event loop, so an unbounded expression — `$count([1..1e9])`,
 * a runaway recursion — pins the whole process, taking every tenant's runs with
 * it. A wall-clock race would not help: it cannot interrupt synchronous work.
 * The engine's entry/exit hooks can, so the guard is applied inside evaluation.
 */
export const DEFAULT_TIMEOUT_MS = 5_000;
export const DEFAULT_MAX_DEPTH = 500;

export interface EvaluateOptions {
  /** Wall-clock budget for the evaluation (default 5s). */
  timeoutMs?: number;
  /** Maximum recursion depth (default 500). */
  maxDepth?: number;
}

export class ExpressionTimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`JSONata expression exceeded its ${timeoutMs}ms time budget`);
    this.name = 'ExpressionTimeoutError';
  }
}

export class ExpressionDepthError extends Error {
  constructor(maxDepth: number) {
    super(`JSONata expression exceeded its maximum depth of ${maxDepth}`);
    this.name = 'ExpressionDepthError';
  }
}

/**
 * Bound an expression's runtime and recursion depth.
 *
 * jsonata invokes these hooks on entering and leaving every sub-expression, so
 * throwing from the entry hook aborts evaluation mid-flight — which a
 * Promise.race around evaluate() could never do.
 */
function timeboxExpression(expr: Expression, timeoutMs: number, maxDepth: number): void {
  let depth = 0;
  const deadline = Date.now() + timeoutMs;

  const checkLimits = (): void => {
    if (depth > maxDepth) {
      throw new ExpressionDepthError(maxDepth);
    }
    if (Date.now() > deadline) {
      throw new ExpressionTimeoutError(timeoutMs);
    }
  };

  expr.assign(Symbol.for('jsonata.__evaluate_entry') as unknown as string, () => {
    depth++;
    checkLimits();
  });

  expr.assign(Symbol.for('jsonata.__evaluate_exit') as unknown as string, () => {
    depth--;
    checkLimits();
  });
}

export async function evaluate(
  expression: string,
  data: unknown,
  options: EvaluateOptions = {},
): Promise<unknown> {
  const compiled = jsonata(expression);
  timeboxExpression(
    compiled,
    options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    options.maxDepth ?? DEFAULT_MAX_DEPTH,
  );
  return compiled.evaluate(data as object);
}

export async function evaluateBoolean(
  expression: string,
  data: unknown,
  options: EvaluateOptions = {},
): Promise<boolean> {
  const result = await evaluate(expression, data, options);
  return Boolean(result);
}

export async function evaluateString(
  expression: string,
  data: unknown,
  options: EvaluateOptions = {},
): Promise<string> {
  const result = await evaluate(expression, data, options);
  return String(result ?? '');
}
