// app/api/dishes/route.js
import { NextResponse } from "next/server";

// In-memory data store representing our Ethiopian food database
const dishes = [
  { id: "kitfo", name: "Special Kitfo", price: 18, category: "Beef" },
  { id: "doro-wat", name: "Doro Wat", price: 20, category: "Chicken" },
  { id: "tibis", name: "Beef Tibis", price: 16, category: "Beef" }
];

export async function GET() {
  // Return the data collection directly with a standard 200 OK status
  return NextResponse.json(dishes, { status: 200 });
}
