import jsonata from 'jsonata';

export async function evaluate(
  expression: string,
  data: unknown,
): Promise<unknown> {
  const compiled = jsonata(expression);
  return compiled.evaluate(data as object);
}

export async function evaluateBoolean(
  expression: string,
  data: unknown,
): Promise<boolean> {
  const result = await evaluate(expression, data);
  return Boolean(result);
}

export async function evaluateString(
  expression: string,
  data: unknown,
): Promise<string> {
  const result = await evaluate(expression, data);
  return String(result ?? '');
}
