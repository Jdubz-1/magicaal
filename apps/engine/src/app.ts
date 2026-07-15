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
  app.use(
    express.json({
      // /internal/packages/install receives base64-encoded .mpack bundles —
      // must match (or exceed) the API's own upload limit (apps/api/src/app.ts),
      // since it forwards the same body here verbatim.
      limit: '25mb',
    }),
  );
  app.use(requestLogger);

  app.use(router);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
