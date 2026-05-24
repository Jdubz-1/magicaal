import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

export function createApp() {
  const app = express();

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'OK', service: 'web', timestamp: new Date().toISOString() });
  });

  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  return app;
}
