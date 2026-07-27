-- Migration 0003 — Land Potential Review submissions
--
-- Habitat practice funnel for Central Texas landowners exploring regenerative
-- development. Parallels hvac_founding_five_requests lifecycle model but
-- adapted for land-based feasibility exploration rather than trade operations.
--
-- Rollback: drop table land_potential_review_requests;

create table if not exists land_potential_review_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  email text not null,
  relationship_to_property text not null check (relationship_to_property in (
    'owner','co_owner','option_holder','representative','other'
  )),
  property_location text not null,
  acreage_estimate numeric,
  site_control_status text not null check (site_control_status in (
    'owns_free_clear','owns_with_mortgage','under_option','purchase_pending','other'
  )),
  vision text not null,
  preferred_next_step text not null check (preferred_next_step in (
    'land_review','intro_call','feasibility','partnership_conversation','no_meeting_yet'
  )),
  parcel_id text,
  existing_survey_url text,
  existing_improvements text,
  intended_timeline text,
  predevelopment_budget_range text,
  referral_source text,
  consent_recorded_at timestamptz not null default now(),
  consent_version text not null default 'v1',
  status text not null default 'new_land_inquiry' check (status in (
    'new_land_inquiry','awaiting_initial_review','not_currently_aligned',
    'intro_conversation_scheduled','information_requested',
    'land_review_proposed','land_review_active','land_review_delivered',
    'feasibility_proposed','feasibility_active','development_candidate','closed'
  )),
  owner_id uuid references users(id) on delete set null,
  next_action text,
  next_action_due_at timestamptz,
  source text,
  campaign text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1
);

create index if not exists idx_land_review_tenant_status on land_potential_review_requests(tenant_id, status);
create index if not exists idx_land_review_tenant_created on land_potential_review_requests(tenant_id, created_at desc);
