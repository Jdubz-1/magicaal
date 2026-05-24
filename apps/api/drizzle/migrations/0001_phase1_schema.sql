CREATE TABLE `agents_new` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`name` text NOT NULL,
	`handle` text NOT NULL,
	`description` text,
	`current_version_id` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`authoring_mode` text DEFAULT 'studio' NOT NULL,
	`template_source_id` text,
	`stale` integer DEFAULT false NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `agents_new` (`id`, `tenant_id`, `name`, `handle`, `description`, `current_version_id`, `status`, `authoring_mode`, `stale`, `enabled`, `created_at`, `updated_at`)
	SELECT `id`, `tenant_id`, `name`, `slug`, `description`, `current_version_id`, `status`, 'studio', false, true, `created_at`, `updated_at` FROM `agents`;
--> statement-breakpoint
DROP TABLE `agents`;
--> statement-breakpoint
ALTER TABLE `agents_new` RENAME TO `agents`;
--> statement-breakpoint
CREATE UNIQUE INDEX `agents_handle_unique` ON `agents` (`handle`);
--> statement-breakpoint
CREATE TABLE `agent_versions_new` (
	`id` text PRIMARY KEY NOT NULL,
	`agent_id` text NOT NULL,
	`version_number` integer NOT NULL,
	`graph_json` text NOT NULL,
	`publish_notes` text,
	`content_hash` text DEFAULT '' NOT NULL,
	`sync_event_id` text,
	`created_by` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `agent_versions_new` (`id`, `agent_id`, `version_number`, `graph_json`, `publish_notes`, `content_hash`, `created_by`, `created_at`)
	SELECT `id`, `agent_id`, `version`, `graph_definition`, `change_notes`, '', `created_by`, `created_at` FROM `agent_versions`;
--> statement-breakpoint
DROP TABLE `agent_versions`;
--> statement-breakpoint
ALTER TABLE `agent_versions_new` RENAME TO `agent_versions`;
--> statement-breakpoint
CREATE TABLE `agent_config_new` (
	`agent_id` text PRIMARY KEY NOT NULL,
	`trigger_config` text DEFAULT '{}' NOT NULL,
	`concurrency` text DEFAULT '{}' NOT NULL,
	`retry` text DEFAULT '{}' NOT NULL,
	`timeout_ms` integer,
	`override_map` text DEFAULT '{}' NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `agent_config_new` (`agent_id`, `trigger_config`, `concurrency`, `retry`, `override_map`, `updated_at`)
	SELECT `agent_id`, `trigger_config`, `concurrency_config`, `retry_config`, '{}', `updated_at` FROM `agent_config`;
--> statement-breakpoint
DROP TABLE `agent_config`;
--> statement-breakpoint
ALTER TABLE `agent_config_new` RENAME TO `agent_config`;
--> statement-breakpoint
ALTER TABLE `users` ADD COLUMN `name` text DEFAULT '' NOT NULL;
--> statement-breakpoint
CREATE TABLE `sync_events` (
	`id` text PRIMARY KEY NOT NULL,
	`trigger` text NOT NULL,
	`started_at` integer NOT NULL,
	`completed_at` integer,
	`agents_processed` integer DEFAULT 0 NOT NULL,
	`changes_applied` integer DEFAULT 0 NOT NULL,
	`error_count` integer DEFAULT 0 NOT NULL,
	`summary_json` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `named_router_policies` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`name` text NOT NULL,
	`config_json` text NOT NULL,
	`overridable` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `provider_pricing` (
	`id` text PRIMARY KEY NOT NULL,
	`provider` text NOT NULL,
	`model` text NOT NULL,
	`prompt_tokens_per_million` real NOT NULL,
	`completion_tokens_per_million` real NOT NULL,
	`currency` text DEFAULT 'USD' NOT NULL,
	`effective_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `integration_connections` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`service` text NOT NULL,
	`display_name` text NOT NULL,
	`auth_type` text NOT NULL,
	`credentials_enc` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`last_used_at` integer,
	`expires_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `integration_oauth_states` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`service` text NOT NULL,
	`state_token` text NOT NULL,
	`redirect_uri` text NOT NULL,
	`code_verifier` text,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `integration_oauth_states_state_token_unique` ON `integration_oauth_states` (`state_token`);
--> statement-breakpoint
CREATE TABLE `package_registry` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`name` text NOT NULL,
	`version` text NOT NULL,
	`publisher` text NOT NULL,
	`package_type` text NOT NULL,
	`manifest_json` text NOT NULL,
	`installed_at` integer NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `marketplace_catalog_cache` (
	`id` text PRIMARY KEY NOT NULL,
	`fetched_at` integer NOT NULL,
	`catalog_json` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `marketplace_account` (
	`id` text PRIMARY KEY NOT NULL,
	`api_key_enc` text NOT NULL,
	`linked_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `asset_licenses` (
	`id` text PRIMARY KEY NOT NULL,
	`package_id` text NOT NULL,
	`license_type` text NOT NULL,
	`expires_at` integer,
	`last_validated_at` integer,
	`grace_period_ends_at` integer,
	`status` text DEFAULT 'active' NOT NULL,
	FOREIGN KEY (`package_id`) REFERENCES `package_registry`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`agent_id` text NOT NULL,
	`external_id` text,
	`schema_version` integer DEFAULT 1 NOT NULL,
	`last_active_at` integer NOT NULL,
	`expires_at` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session_context` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`key` text NOT NULL,
	`value_json` text NOT NULL,
	`accumulated_count` integer DEFAULT 0 NOT NULL,
	`token_estimate` integer,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session_run_links` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`run_id` text NOT NULL,
	`position` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `mcp_servers` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`name` text NOT NULL,
	`transport` text NOT NULL,
	`url` text,
	`command` text,
	`args_json` text,
	`env_json` text,
	`enabled` integer DEFAULT true NOT NULL,
	`last_tested_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `workspaces` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`agent_id` text NOT NULL,
	`session_id` text,
	`container_id` text,
	`status` text DEFAULT 'provisioning' NOT NULL,
	`repository_url` text,
	`ref` text,
	`volume_name` text,
	`image` text,
	`resource_json` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `data_sources` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`name` text NOT NULL,
	`source_type` text NOT NULL,
	`connection_json` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `prompt_versions` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`name` text NOT NULL,
	`version_number` integer NOT NULL,
	`content` text NOT NULL,
	`created_by` text NOT NULL,
	`is_active` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `test_cases` (
	`id` text PRIMARY KEY NOT NULL,
	`agent_id` text NOT NULL,
	`name` text NOT NULL,
	`input_json` text NOT NULL,
	`assertions_json` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `usage_counters` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`counter_key` text NOT NULL,
	`value` integer DEFAULT 0 NOT NULL,
	`window_start` integer,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `usage_counters_counter_key_unique` ON `usage_counters` (`counter_key`);
