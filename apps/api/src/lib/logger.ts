import pino from 'pino';
import { config } from '../config';

// Credentials must never reach a log sink. pino-http's default serializer logs
// req.headers wholesale, which carries the caller's bearer token, session
// cookie, and the engine<->API shared secret. Redaction is configured on the
// shared logger rather than on pinoHttp because a child logger inherits the
// parent's redact paths, and pinoHttp({ logger }) creates a child — so this one
// block also covers error logs and any direct logger.info({ req }) call.
// Hyphenated keys need bracket notation; header names arrive lowercased from
// Node, and redact paths are case-sensitive.
export const LOG_REDACT = {
  paths: [
    'req.headers.authorization',
    'req.headers.cookie',
    'req.headers["x-internal-auth"]',
    'res.headers["set-cookie"]',
  ],
  censor: '[Redacted]',
};

export const logger = pino({ level: config.logLevel, redact: LOG_REDACT });
