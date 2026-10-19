// app/api/dishes/route.js
import { NextResponse } from "next/server";

export const dishesDb = [
  { id: "kitfo", name: "Special Kitfo", price: 18 },
  { id: "doro-wat", name: "Doro Wat", price: 20 },
  { id: "tibis", name: "Beef Tibis", price: 16 }
];

export async function GET() {
  return NextResponse.json(dishesDb, { status: 200 });
}
