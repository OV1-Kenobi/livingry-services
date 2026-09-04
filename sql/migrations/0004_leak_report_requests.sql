-- Voluntary Leak Priority Report requests (post-diagnostic opt-in).
--
-- One row per request: the visitor's email (required), optional fields, and
-- the top-leak category from their self-assessment. Individual diagnostic
-- answers are never stored here — they stay in the visitor's browser by
-- design. The stored request is the source of truth the founder fulfils
-- manually (report plus personal interpretation) until an email service
-- provider is selected.
--
-- Rollback: drop table leak_report_requests;

create table if not exists leak_report_requests (
  id text primary key default gen_random_uuid()::text,
  created_at timestamptz not null default now(),
  email_normalized text not null,
  full_name text,
  phone text,
  company_website text,
  score int not null check (score >= 0 and score <= 51),
  band text not null,
  focus_category text,
  consent_text_version text not null,
  consent_at timestamptz not null
);

create index if not exists idx_leak_report_created on leak_report_requests(created_at desc);
create index if not exists idx_leak_report_email on leak_report_requests(email_normalized);
