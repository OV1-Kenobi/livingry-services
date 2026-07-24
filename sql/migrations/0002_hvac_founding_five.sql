-- Founding Five HVAC pilot requests.
--
-- Standalone table for the trade-specific acquisition funnel. Mirrors the
-- lifecycle state model in the implementation brief (section 6). Every active
-- record carries a next action, a responsible owner, and a due timestamp.
--
-- Rollback: drop table hvac_founding_five_requests;

create table if not exists hvac_founding_five_requests (
  id text primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  state text not null default 'new_request' check (state in (
    'new_request','researching','audit_prepared','audit_sent',
    'fit_call_invited','fit_call_scheduled','qualified','proposal_sent',
    'pilot_won','pilot_lost','nurture','disqualified'
  )),
  owner_id text not null,
  next_action text not null,
  next_action_due_at timestamptz not null,
  full_name text not null,
  company_name text not null,
  email_normalized text not null,
  company_domain text not null,
  role text not null,
  phone text,
  company_website text,
  workflow_problem text not null,
  consent_text_version text not null,
  consent_at timestamptz not null,
  metadata_json jsonb not null default '{}'::jsonb,
  -- Dedup by normalized email + company domain. Repeats update submission_count
  -- rather than creating competing active records.
  dedupe_key text not null unique,
  duplicate_of text references hvac_founding_five_requests(id) on delete set null,
  submission_count int not null default 1
);

create index if not exists idx_hvac_ff_state on hvac_founding_five_requests(state);
create index if not exists idx_hvac_ff_due on hvac_founding_five_requests(next_action_due_at);
