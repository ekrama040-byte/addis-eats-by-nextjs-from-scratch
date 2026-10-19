// app/api/orders/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, address, items } = body;
    const fieldErrors = {};

    // Standard Day 33 body validation schema rules
    if (!name || name.trim() === "") fieldErrors.name = "Customer name is required.";
    if (!address || address.trim() === "") fieldErrors.address = "Delivery address is required.";
    if (!items || !Array.isArray(items) || items.length === 0) {
      fieldErrors.items = "Order must contain at least one dish item.";
    }

    // If there are validation failures, return 422 with structural fieldErrors
    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json({ success: false, fieldErrors }, { status: 422 });
    }

    // Success transaction pathway response
    return NextResponse.json({ success: true, orderId: "ORD-" + Math.floor(Math.random() * 100000) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid payload signature" }, { status: 400 });
  }
}
