import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './client';
import { logger } from '../lib/logger';
import path from 'path';

export async function runMigrations(): Promise<void> {
  const migrationsFolder = path.join(__dirname, '../../drizzle/migrations');
  logger.info('Running database migrations');
  migrate(db, { migrationsFolder });
  logger.info('Database migrations complete');
}
