/**
 * A thrown error as one sentence worth logging.
 *
 * `err.message` alone loses the reason for two common shapes. An AggregateError
 * — what a refused or unreachable connection produces once Node has tried every
 * resolved address — carries an empty message, so the failure logged as
 * `err: ""`. And `fetch` reports every transport failure as the bare string
 * "fetch failed", putting the DNS or socket detail in `err.cause`, so a whole
 * class of network failures was unattributable from the logs.
 */

const MAX_CAUSE_DEPTH = 4;

function nestedCodes(err: Error): string {
  const nested = (err as { errors?: unknown[] }).errors;
  if (!Array.isArray(nested)) return '';
  return nested
    .map((e) => (e instanceof Error ? ((e as NodeJS.ErrnoException).code ?? e.message) : String(e)))
    .filter(Boolean)
    .join(', ');
}

export function describeError(err: unknown): string {
  if (!(err instanceof Error)) return String(err);

  const parts: string[] = [];
  let current: unknown = err;
  let depth = 0;

  while (current instanceof Error && depth++ < MAX_CAUSE_DEPTH) {
    parts.push(current.message || current.name);
    const code = (current as NodeJS.ErrnoException).code;
    if (code) parts.push(code);
    parts.push(nestedCodes(current));
    current = (current as { cause?: unknown }).cause;
  }

  return [...new Set(parts.filter(Boolean))].join(': ');
}
