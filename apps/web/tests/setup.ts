// createApp() reads config at import time, and config requires a JWT secret.
process.env.JWT_SECRET = 'test-secret-for-jest-do-not-use-in-production';
