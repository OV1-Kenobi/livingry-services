-- Migration 0001 — Ops dashboard tool configuration persistence.
--
-- The authenticated Ops control panel persists per-category tool configuration
-- (add / change / disable / replace + change history) in the existing
-- tenant-scoped integration_connections table. App-level tool anatomy and the
-- change-history log are stored in the row's config_json jsonb column; the
-- native columns (provider, category, display_name, status, signup_url) remain
-- the queryable/uniqueness surface. No new table is required — this table is
-- already the per-tenant vendor registry.
--
-- This migration is idempotent and safe to re-run. It adds an index to support
-- category-grouped reads for the dashboard.

create index if not exists idx_integration_connections_tenant_category
  on integration_connections(tenant_id, category);
