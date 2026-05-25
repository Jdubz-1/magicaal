import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Application } from 'express';
import helmet from 'helmet';
import path from 'path';
import { loadSession, requireSession } from './middleware/session';
import { authRouter } from './routes/auth';
import { studioRouter } from './routes/studio';
import { adminRouter } from './routes/admin';
import { createApiClient } from './lib/api-client';

export function createApp(): Application {
  const app = express();

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(loadSession);

  app.get('/health', (_req, res) => {
    res.json({ status: 'OK', service: 'web', timestamp: new Date().toISOString() });
  });

  // API proxy — forwards /api/* to the backend API with auth token
  app.use('/api', requireSession, async (req, res) => {
    try {
      const api = createApiClient(req.accessToken);
      const apiPath = `/v1${req.path}`;
      const response = await api.request({
        method: req.method as 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        url: apiPath,
        params: req.query,
        data: req.method !== 'GET' ? req.body : undefined,
      });
      res.status(response.status).json(response.data);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { status: number; data: unknown } };
      if (axiosErr.response) {
        res.status(axiosErr.response.status).json(axiosErr.response.data);
      } else {
        res.status(502).json({ error: 'API unreachable' });
      }
    }
  });

  app.use(authRouter);
  app.use('/studio', studioRouter);
  app.use('/admin', adminRouter);

  app.use(express.static(path.join(__dirname, '..', 'public'), { index: false }));

  // Root redirect
  app.get('/', requireSession, (_req, res) => {
    res.redirect('/admin');
  });

  return app;
}
