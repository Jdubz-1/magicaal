CREATE TABLE IF NOT EXISTS `named_router_policies` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL REFERENCES `tenants`(`id`),
	`name` text NOT NULL,
	`config_json` text NOT NULL,
	`overridable` integer NOT NULL DEFAULT true,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `named_router_policies_tenant_id_name_unique` ON `named_router_policies` (`tenant_id`,`name`);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `provider_pricing` (
	`id` text PRIMARY KEY NOT NULL,
	`provider` text NOT NULL,
	`model` text NOT NULL,
	`prompt_tokens_per_million` real NOT NULL,
	`completion_tokens_per_million` real NOT NULL,
	`currency` text NOT NULL DEFAULT 'USD',
	`effective_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `provider_pricing_provider_model_unique` ON `provider_pricing` (`provider`,`model`);
