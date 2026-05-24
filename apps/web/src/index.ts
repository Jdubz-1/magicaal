import { createApp } from './app';
import pino from 'pino';

const logger = pino({ level: process.env.LOG_LEVEL ?? 'info' });
const port = parseInt(process.env.PORT ?? '8080', 10);

const app = createApp();

app.listen(port, () => {
  logger.info({ port, env: process.env.NODE_ENV ?? 'development' }, 'Web server started');
});
