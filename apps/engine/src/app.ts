import cors from 'cors';
import express, { type Application } from 'express';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { requestLogger } from './middleware/requestLogger';
import { router } from './routes';

export function createApp(): Application {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(requestLogger);

  app.use(router);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
