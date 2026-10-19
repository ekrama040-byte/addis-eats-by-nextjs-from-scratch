// app/api/dishes/[id]/route.js
import { NextResponse } from "next/server";

const dishes = [
  { id: "kitfo", name: "Special Kitfo", price: 18, category: "Beef" },
  { id: "doro-wat", name: "Doro Wat", price: 20, category: "Chicken" },
  { id: "tibis", name: "Beef Tibis", price: 16, category: "Beef" }
];

export async function GET(request, { params }) {
  // Await params parameter fields according to App Router specifications
  const { id } = await params;
  
  // Search our dish database collection for the matching ID
  const dish = dishes.find((item) => item.id === id);

  if (!dish) {
    // Return standard error shapes if the identifier is unknown
    return NextResponse.json(
      { error: "Not Found", message: `Dish with identifier '${id}' does not exist.` },
      { status: 404 }
    );
  }

  return NextResponse.json(dish, { status: 200 });
}
