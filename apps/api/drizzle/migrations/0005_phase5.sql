ALTER TABLE `package_registry` ADD COLUMN `publisher_sig` text;
--> statement-breakpoint
ALTER TABLE `package_registry` ADD COLUMN `content_hash` text;
--> statement-breakpoint
ALTER TABLE `package_registry` ADD COLUMN `magicaal_countersig` text;
--> statement-breakpoint
ALTER TABLE `package_registry` ADD COLUMN `signature_status` text NOT NULL DEFAULT 'unverified';
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `integration_triggers` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL REFERENCES `tenants`(`id`),
	`service` text NOT NULL,
	`tenant_slug` text NOT NULL,
	`agent_id` text NOT NULL,
	`event_filter` text,
	`secret` text NOT NULL,
	`enabled` integer NOT NULL DEFAULT true,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_integration_triggers_dispatch` ON `integration_triggers` (`service`, `tenant_slug`);
