// app/api/orders/route.js
import { NextResponse } from "next/server";
import { validateOrder } from "../../lib/schema";

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateOrder(body);

    if (!validation.isValid) {
      return NextResponse.json({ success: false, fieldErrors: validation.errors }, { status: 422 });
    }

    return NextResponse.json(
      { success: true, orderId: "ORD-" + Math.floor(Math.random() * 90000 + 10000) },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Bad Request", message: "Malformed JSON payload." }, { status: 400 });
  }
}
