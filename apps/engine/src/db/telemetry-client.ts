import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { config } from '../config';
import * as telemetrySchema from './telemetry-schema';

const dbPath = config.telemetryDatabasePath.replace(/^file:/, '');
const sqlite = new Database(dbPath);
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');

export const telemetryDb = drizzle(sqlite, { schema: telemetrySchema });
