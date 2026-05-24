CREATE TABLE `api_keys` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`user_id` text,
	`name` text NOT NULL,
	`key_hash` text NOT NULL,
	`last_used_at` integer,
	`expires_at` integer,
	`revoked` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `api_keys_key_hash_unique` ON `api_keys` (`key_hash`);--> statement-breakpoint
CREATE TABLE `auth_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`refresh_token_hash` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `auth_sessions_refresh_token_hash_unique` ON `auth_sessions` (`refresh_token_hash`);--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`tenant_id` text NOT NULL,
	`role` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tenants` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`resource_limits` text DEFAULT '{}',
	`enabled` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tenants_slug_unique` ON `tenants` (`slug`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `agent_config` (
	`agent_id` text PRIMARY KEY NOT NULL,
	`trigger_config` text DEFAULT '{}' NOT NULL,
	`concurrency_config` text DEFAULT '{}' NOT NULL,
	`retry_config` text DEFAULT '{}' NOT NULL,
	`session_config` text DEFAULT '{}' NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `agent_versions` (
	`id` text PRIMARY KEY NOT NULL,
	`agent_id` text NOT NULL,
	`version` integer NOT NULL,
	`graph_definition` text NOT NULL,
	`change_notes` text,
	`created_by` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `agents` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`current_version_id` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `invocation_keys` (
	`id` text PRIMARY KEY NOT NULL,
	`agent_id` text NOT NULL,
	`tenant_id` text NOT NULL,
	`label` text NOT NULL,
	`key_hash` text NOT NULL,
	`last_used_at` integer,
	`expires_at` integer,
	`revoked` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `invocation_keys_key_hash_unique` ON `invocation_keys` (`key_hash`);--> statement-breakpoint
CREATE TABLE `invocation_log` (
	`id` text PRIMARY KEY NOT NULL,
	`agent_id` text NOT NULL,
	`tenant_id` text NOT NULL,
	`invocation_key_id` text,
	`strategy` text NOT NULL,
	`request_ip` text,
	`run_id` text,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`invocation_key_id`) REFERENCES `invocation_keys`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `invocation_policies` (
	`agent_id` text PRIMARY KEY NOT NULL,
	`strategy` text NOT NULL,
	`jwt_config` text,
	`rate_limit` text,
	`override_flags` text DEFAULT '{}' NOT NULL,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON UPDATE no action ON DELETE no action
);
