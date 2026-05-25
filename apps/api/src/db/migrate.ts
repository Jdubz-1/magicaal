import path from 'path';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { logger } from '../lib/logger';
import { db } from './client';

export async function runMigrations(): Promise<void> {
  const migrationsFolder = path.join(__dirname, '../../drizzle/migrations');
  logger.info('Running database migrations');
  migrate(db, { migrationsFolder });
  logger.info('Database migrations complete');
}

// Allow running as a standalone script: ts-node src/db/migrate.ts
if (require.main === module) {
  runMigrations().catch((err) => {
    console.error('Migration failed', err);
    process.exit(1);
  });
}
