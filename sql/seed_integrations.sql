-- Pre-filled integration_connections rows for the Livingry dogfood tenant.
-- Values sourced from the user's curated AI toolbox shared earlier in this
-- thread. Credentials fields intentionally left NULL — no API keys were
-- shared, and per instructions, trials for tools not needed for
-- marketing/sales/intake are deferred (billing_status = 'delay_trial')
-- until the first paying client signs.

-- Assumes a tenant row already exists; replace :tenant_id at insert time
-- via the /api/ops/setup route rather than running this file directly.

insert into integration_connections
  (tenant_id, category, provider, display_name, status, billing_status,
   monthly_cost_cents, trial_length_days, signup_url, notes)
values
  (:'tenant_id', 'booking_scheduling', 'victoria_ai', 'Victoria AI',
    'not_configured', 'delay_trial', 12000, 30,
    'https://www.versionseven.ai/pricing',
    'Booking & scheduling. $10 first month, $120/mo thereafter. Needed for marketing/sales/intake — activate first.'),

  (:'tenant_id', 'operations_admin', 'ela_ai', 'Ela AI',
    'not_configured', 'delay_trial', 14900, 14,
    'https://ela.ai',
    'Operations, admin fulfillment automation. $149/mo, 2-week free trial. Optional adapter per TradeOps System Boundary — not a system of record. Delay until first paying client.'),

  (:'tenant_id', 'content_creation', 'caliope_ai', 'Caliope AI',
    'not_configured', 'delay_trial', 29000, 30,
    null,
    'Content creation to attract/build trust. $290/mo for 10 seats billed annually, 30-day free trial. Not needed for marketing/sales/intake at pre-revenue stage — delay.'),

  (:'tenant_id', 'sales_call_intelligence', 'aurameet', 'Aurameet.live AI',
    'not_configured', 'delay_trial', 999, null,
    'https://app.aura-app.ai',
    'Analyzes sales calls in real time. $9.99/mo. Low cost — candidate for early activation once discovery calls begin.'),

  (:'tenant_id', 'marketing_crm', 'brevo', 'Brevo',
    'not_configured', 'delay_trial', 808, null,
    'https://www.brevo.com/pricing',
    'Email/SMS/WhatsApp marketing + CRM. $8.08/mo. Core to intake gateway confirmations and review/continuity sequences — activate first alongside Victoria AI.'),

  (:'tenant_id', 'sales_outreach', 'aura_app_ai', 'Aura-app.ai',
    'not_configured', 'delay_trial', 9700, 14,
    'https://app.aura-app.ai',
    'AI Sales Performance Platform — marketing agent, outreach/follow-up rep, onboarding assistant, closer. $97/mo + 20% commission, 2-week free trial. Delay until pipeline exists to justify commission structure.'),

  (:'tenant_id', 'orchestration', 'n8n', 'n8n',
    'not_configured', 'delay_trial', 6000, 14,
    'https://n8n.io/pricing',
    'AI agent/workflow orchestration core for the entire TradeOps layer. $24-60/mo, 2-week free trial. This is the orchestration backbone — activate as soon as the dogfood workflows are ready to wire, independent of paying-client status.')
on conflict (tenant_id, provider) do update set
  display_name = excluded.display_name,
  monthly_cost_cents = excluded.monthly_cost_cents,
  trial_length_days = excluded.trial_length_days,
  signup_url = excluded.signup_url,
  notes = excluded.notes,
  updated_at = now();
