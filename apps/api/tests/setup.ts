process.env.DATABASE_URL = 'file::memory:';
process.env.JWT_SECRET = 'test-secret-for-jest-do-not-use-in-production';
process.env.MAGICAAL_MASTER_KEY = 'test-master-key-for-jest-do-not-use';

// The limiter stays live in every test — it is middleware on the real app, and
// silently disabling it would leave it unexercised until production. The
// budgets are raised instead: one test file logs in 33 times, and the suite's
// heaviest hammer far more than a human would. rate-limit.test.ts mocks the
// config down to a tiny budget to assert the limiter actually bites.
process.env.AUTH_RATE_LIMIT_MAX = '100000';
process.env.RATE_LIMIT_MAX = '100000';
