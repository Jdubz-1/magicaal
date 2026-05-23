import { requireEnv } from '../../src/config';

describe('requireEnv', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('returns the value when the env var is set', () => {
    process.env.TEST_VAR = 'hello';
    expect(requireEnv('TEST_VAR')).toBe('hello');
  });

  it('throws with a clear message when the env var is missing', () => {
    delete process.env.TEST_VAR;
    expect(() => requireEnv('TEST_VAR')).toThrow(
      'Missing required environment variable: TEST_VAR',
    );
  });

  it('throws when the env var is an empty string', () => {
    process.env.TEST_VAR = '';
    expect(() => requireEnv('TEST_VAR')).toThrow(
      'Missing required environment variable: TEST_VAR',
    );
  });
});
