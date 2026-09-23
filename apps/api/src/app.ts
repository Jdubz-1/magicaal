import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { apiRateLimit, authRateLimit } from './middleware/rate-limit';
import { requestLogger } from './middleware/requestLogger';
import { router } from './routes';
import { config } from './config';

export function createApp(): Express {
  const app = express();

  app.use(helmet());
  app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN ?? 'http://localhost:8080' }));
  app.use(
    express.json({
      // Air-gapped .mpack bundle uploads arrive base64-encoded in JSON bodies
      limit: '25mb',
      // Integration webhook signatures (Slack, GitHub, ...) are HMACs over the
      // exact raw body bytes — capture them before JSON parsing discards them.
      verify: (req, _res, buf) => {
        (req as express.Request).rawBody = buf.toString('utf8');
      },
    }),
  );
  app.use(cookieParser());
  app.use(requestLogger);

  // What req.ip means, and therefore what the limiter below counts. See
  // config.parseTrustProxy — the default is false on purpose.
  app.set('trust proxy', config.trustProxy);

  // Order matters: the strict auth budget is mounted first so a login attempt
  // is counted against it rather than the loose one. Neither covers
  // /internal/* (engine-to-API traffic, throttling it would throttle agent
  // execution) or the health route.
  app.use('/v1/auth', authRateLimit);
  app.use('/v1', apiRateLimit);

  app.use(router);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
