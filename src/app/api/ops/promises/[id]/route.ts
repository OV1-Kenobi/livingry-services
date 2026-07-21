import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const b = await req.json();
  const sets: string[] = [];
  const values: any[] = [];
  let idx = 1;
  const push = (col: string, val: any) => { sets.push(`${col} = $${idx}`); values.push(val); idx++; };

  if (b.status !== undefined) push("status", b.status);
  if (b.due_at !== undefined) push("due_at", b.due_at);

  if (sets.length === 0) return NextResponse.json({ error: "No fields" }, { status: 400 });
  values.push(id);
  const { rows } = await query(
    `update promises set ${sets.join(", ")} where id = $${idx} returning *`,
    values
  );
  if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ promise: rows[0] });
}
