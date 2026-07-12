import type { Request, Response, NextFunction } from 'express';
import { requireInternalAuth } from '@/middleware/internalAuth';
import { config } from '@/config';

function invoke(headers: Record<string, string | string[] | undefined>): {
  err: unknown;
  called: boolean;
} {
  let err: unknown;
  let called = false;
  const next: NextFunction = (e?: unknown) => {
    if (e) err = e;
    else called = true;
  };
  requireInternalAuth({ headers } as unknown as Request, {} as Response, next);
  return { err, called };
}

describe('requireInternalAuth (engine)', () => {
  it('passes with the correct master key', () => {
    const { err, called } = invoke({ 'x-internal-auth': config.masterKey });
    expect(err).toBeUndefined();
    expect(called).toBe(true);
  });

  it('rejects a missing header', () => {
    const { err, called } = invoke({});
    expect(called).toBe(false);
    expect((err as { status: number }).status).toBe(401);
  });

  it('rejects a wrong key', () => {
    const { err, called } = invoke({ 'x-internal-auth': 'wrong-key' });
    expect(called).toBe(false);
    expect((err as { status: number }).status).toBe(401);
  });

  it('rejects a key that is a prefix of the real one', () => {
    const { err } = invoke({ 'x-internal-auth': config.masterKey.slice(0, -1) });
    expect((err as { status: number }).status).toBe(401);
  });
});
