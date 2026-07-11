import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { requestLogger } from './middleware/requestLogger';
import { router } from './routes';

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

  app.use(router);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
