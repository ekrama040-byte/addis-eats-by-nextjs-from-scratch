// app/api/dishes/[id]/route.js
import { NextResponse } from "next/server";
import { dishesDb } from "../route";

export async function GET(request, { params }) {
  const { id } = await params;
  const dish = dishesDb.find((d) => d.id === id);

  if (!dish) {
    return NextResponse.json(
      { error: "Not Found", message: `The dish identifier '${id}' was not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(dish, { status: 200 });
}
