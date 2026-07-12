CREATE TABLE IF NOT EXISTS `integration_oauth_apps` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL REFERENCES `tenants`(`id`),
	`service` text NOT NULL,
	`client_id` text NOT NULL,
	`client_secret_enc` text NOT NULL,
	`scopes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `integration_oauth_apps_tenant_service_idx` ON `integration_oauth_apps` (`tenant_id`, `service`);
--> statement-breakpoint
ALTER TABLE `integration_oauth_states` ADD COLUMN `nonce_hash` text;
