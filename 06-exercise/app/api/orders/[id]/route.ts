import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const demoOrder = {
  orderId: "AE-1001",
  status: "on_the_way",
  label: "Your order is on the way",
  total: 420,
  updatedAt: new Date().toISOString(),
  courierAddress: "Near Meskel Square, Addis Ababa",
  deliveryAddress: "Bole, Addis Ababa",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (id !== demoOrder.orderId) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(demoOrder, {
    headers: { "Cache-Control": "no-store" },
  });
}