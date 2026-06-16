ALTER TABLE `sessions` ADD COLUMN `root_run_id` text;
--> statement-breakpoint
ALTER TABLE `sessions` ADD COLUMN `status` text NOT NULL DEFAULT 'active';
--> statement-breakpoint
ALTER TABLE `sessions` ADD COLUMN `metadata` text;
--> statement-breakpoint
ALTER TABLE `session_context` ADD COLUMN `accumulation_type` text NOT NULL DEFAULT 'append';
--> statement-breakpoint
ALTER TABLE `session_context` ADD COLUMN `schema_version` integer NOT NULL DEFAULT 1;
--> statement-breakpoint
ALTER TABLE `test_cases` ADD COLUMN `tenant_id` text REFERENCES `tenants`(`id`);
--> statement-breakpoint
ALTER TABLE `test_cases` ADD COLUMN `last_result` text;
--> statement-breakpoint
ALTER TABLE `prompt_versions` ADD COLUMN `pack_namespace` text;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `caal_configuration` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL REFERENCES `tenants`(`id`),
	`enabled` integer NOT NULL DEFAULT true,
	`model_override` text,
	`router_policy_id` text,
	`generation_mode` text NOT NULL DEFAULT 'complete',
	`confirmation_mode` text NOT NULL DEFAULT 'confirm_structural',
	`show_reasoning` integer NOT NULL DEFAULT false,
	`system_prompt_suffix` text,
	`preferred_connections` text,
	`allowed_operations` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `caal_configuration_tenant_id_unique` ON `caal_configuration` (`tenant_id`);
