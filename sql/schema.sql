-- Livingry Ops Layer — Postgres schema (Dogfood MVP)
-- Mirrors section 5 of the Dogfood MVP Functional Specification.
-- Every business table carries tenant_id, created_at, updated_at, version
-- for optimistic concurrency, per spec section 5.

create extension if not exists "pgcrypto";

create table if not exists tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  timezone text not null default 'America/New_York',
  status text not null default 'active',
  settings_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  email text not null,
  display_name text,
  role text not null default 'operator' check (role in ('owner_admin','operator','reviewer','read_only','automation_service')),
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, email)
);

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  website text,
  industry text,
  source text,
  status text not null default 'active',
  tags jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1
);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  company_id uuid references companies(id) on delete set null,
  name text not null,
  email text,
  phone text,
  preferred_channel text default 'email',
  consent_json jsonb not null default '{}'::jsonb,
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1
);

create table if not exists opportunities (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  company_id uuid references companies(id) on delete set null,
  primary_contact_id uuid references contacts(id) on delete set null,
  stage text not null default 'new' check (stage in (
    'new','contacted','qualified','discovery_scheduled','discovery_complete',
    'proposal_drafting','proposal_sent','negotiation','won','lost','nurture','disqualified'
  )),
  service_type text,
  value_estimate_cents bigint,
  next_action text,
  next_action_due_at timestamptz,
  owner_id uuid references users(id) on delete set null,
  stage_entered_at timestamptz not null default now(),
  lost_reason text,
  proposal_sent_at timestamptz,
  last_interaction_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1
);

create table if not exists engagements (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  opportunity_id uuid references opportunities(id) on delete set null,
  company_id uuid references companies(id) on delete set null,
  name text not null,
  service_type text,
  status text not null default 'onboarding' check (status in (
    'onboarding','active','waiting_on_livingry','waiting_on_client','review_ready',
    'accepted','managed_service','paused','completed','cancelled'
  )),
  health text not null default 'green' check (health in ('green','yellow','red')),
  scope_summary text,
  start_date date,
  target_date date,
  owner_id uuid references users(id) on delete set null,
  next_action text,
  next_action_due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  entity_type text not null default 'general',
  entity_id uuid,
  title text not null,
  owner_id uuid references users(id) on delete set null,
  priority text not null default 'medium' check (priority in ('low','medium','high')),
  status text not null default 'open' check (status in ('open','completed','snoozed')),
  due_at timestamptz not null,
  completed_at timestamptz,
  snooze_reason text,
  source_event_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1
);

create table if not exists promises (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  entity_type text default 'general',
  entity_id uuid,
  direction text not null check (direction in ('livingry_to_client','client_to_livingry')),
  text text not null,
  promisor text,
  beneficiary text,
  due_at timestamptz not null,
  original_due_at timestamptz not null,
  status text not null default 'open' check (status in ('open','fulfilled','renegotiated','waived','breached')),
  source_interaction_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1
);

create table if not exists interactions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  company_id uuid references companies(id) on delete set null,
  channel text,
  direction text,
  occurred_at timestamptz not null default now(),
  subject text,
  body_ref text,
  summary text,
  sentiment text,
  external_id text,
  created_at timestamptz not null default now()
);

create table if not exists drafts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  draft_type text not null,
  entity_type text,
  entity_id uuid,
  content_json jsonb not null default '{}'::jsonb,
  source_refs_json jsonb not null default '[]'::jsonb,
  model_metadata_json jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending','approved','rejected','edited_approved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists approvals (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  draft_id uuid references drafts(id) on delete set null,
  action_type text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  requested_by uuid references users(id) on delete set null,
  assigned_to uuid references users(id) on delete set null,
  decided_by uuid references users(id) on delete set null,
  decision_reason text,
  decided_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists exceptions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  code text not null,
  severity text not null default 'P3' check (severity in ('P1','P2','P3','P4')),
  entity_type text,
  entity_id uuid,
  status text not null default 'open' check (status in ('open','acknowledged','investigating','waiting','resolved','suppressed')),
  owner_id uuid references users(id) on delete set null,
  due_at timestamptz,
  details_json jsonb not null default '{}'::jsonb,
  resolution text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists review_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  engagement_id uuid references engagements(id) on delete set null,
  channel text,
  eligibility_json jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  scheduled_at timestamptz,
  sent_at timestamptz,
  external_id text,
  outcome text,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  event_type text not null,
  occurred_at timestamptz not null,
  received_at timestamptz not null default now(),
  source text not null,
  external_id text,
  idempotency_key text not null,
  schema_version text not null default '1.0',
  payload_json jsonb not null default '{}'::jsonb,
  processing_status text not null default 'received',
  created_at timestamptz not null default now(),
  unique (tenant_id, idempotency_key)
);

create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  actor_type text not null,
  actor_id text,
  action text not null,
  entity_type text,
  entity_id uuid,
  before_json jsonb,
  after_json jsonb,
  event_id uuid references events(id) on delete set null,
  correlation_id uuid,
  occurred_at timestamptz not null default now()
);

-- Outsourced tool credential registry. Encrypted at rest (AES-256-GCM in
-- application layer, see src/lib/crypto.ts); category enum mirrors the
-- seven tool categories curated in the user's AI toolbox for this stack.
create table if not exists integration_connections (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  category text not null check (category in (
    'booking_scheduling','operations_admin','content_creation',
    'sales_call_intelligence','marketing_crm','sales_outreach','orchestration'
  )),
  provider text not null,
  display_name text not null,
  status text not null default 'not_configured' check (status in ('not_configured','configured','active','paused','error')),
  billing_status text not null default 'delay_trial' check (billing_status in ('delay_trial','trial_active','subscribed','cancelled')),
  monthly_cost_cents bigint,
  trial_length_days int,
  signup_url text,
  notes text,
  config_json jsonb not null default '{}'::jsonb,
  credentials_encrypted text,
  credentials_iv text,
  credentials_tag text,
  last_success_at timestamptz,
  last_error_at timestamptz,
  last_error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, provider)
);

create index if not exists idx_opportunities_tenant_stage on opportunities(tenant_id, stage);
create index if not exists idx_tasks_tenant_status_due on tasks(tenant_id, status, due_at);
create index if not exists idx_promises_tenant_status_due on promises(tenant_id, status, due_at);
create index if not exists idx_exceptions_tenant_status on exceptions(tenant_id, status);
create index if not exists idx_events_tenant_type on events(tenant_id, event_type);
create index if not exists idx_audit_tenant_entity on audit_log(tenant_id, entity_type, entity_id);
