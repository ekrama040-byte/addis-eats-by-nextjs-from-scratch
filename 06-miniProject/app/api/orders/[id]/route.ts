import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (id !== "AE-1001") {
    return NextResponse.json(
      { message: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      orderId: "AE-1001",
      status: "on_the_way",
      customer: "Ekram",
      restaurant: "Addis Traditional Kitchen",
      total: 420,
      estimatedMinutes: 12,
      updatedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}