import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { opsRateTierResponse, resolveOpsTenant } from "@/lib/ops-gate";

// Leak-focused operator dashboard summary — mirrors the KPI philosophy
// from the TradeOps spec: surface things falling between the cracks,
// not generic activity counts. Tenant comes from the authenticated session.
export async function GET(req: NextRequest) {
	const auth = await resolveOpsTenant(req);
	if (!auth.ok) return auth.response;
	if (!auth.tenantId)
		return opsRateTierResponse(
			auth,
			"No workspace provisioned. Run /api/ops/setup first.",
		);
	const tenantId = auth.tenantId;

	const [
		overdueTasks,
		dueSoonTasks,
		openExceptions,
		overduePromises,
		stalledOpportunities,
		integrationHealth,
	] = await Promise.all([
		query(
			`select count(*) from tasks where tenant_id=$1 and status='open' and due_at < now()`,
			[tenantId],
		),
		query(
			`select count(*) from tasks where tenant_id=$1 and status='open' and due_at >= now() and due_at < now() + interval '24 hours'`,
			[tenantId],
		),
		query(
			`select count(*) from exceptions where tenant_id=$1 and status not in ('resolved','suppressed')`,
			[tenantId],
		),
		query(
			`select count(*) from promises where tenant_id=$1 and status='open' and due_at < now()`,
			[tenantId],
		),
		query(
			`select count(*) from opportunities where tenant_id=$1 and stage not in ('won','lost','disqualified') and updated_at < now() - interval '7 days'`,
			[tenantId],
		),
		query(
			`select category, status, billing_status from integration_connections where tenant_id=$1`,
			[tenantId],
		),
	]);

	return NextResponse.json({
		overdue_tasks: Number(overdueTasks.rows[0].count),
		due_soon_tasks: Number(dueSoonTasks.rows[0].count),
		open_exceptions: Number(openExceptions.rows[0].count),
		overdue_promises: Number(overduePromises.rows[0].count),
		stalled_opportunities: Number(stalledOpportunities.rows[0].count),
		integrations: integrationHealth.rows,
	});
}
