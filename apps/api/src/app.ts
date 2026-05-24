import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { requestLogger } from './middleware/requestLogger';
import { router } from './routes';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN ?? 'http://localhost:8080' }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(requestLogger);

  app.use(router);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
