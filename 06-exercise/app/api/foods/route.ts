import { NextRequest, NextResponse } from "next/server";

const foods = [
  { id: 1, name: "Doro Wat", category: "Ethiopian", price: 280 },
  { id: 2, name: "Shiro Wat", category: "Ethiopian", price: 160 },
  { id: 3, name: "Kitfo", category: "Ethiopian", price: 320 },
  { id: 4, name: "Beyaynet", category: "Vegetarian", price: 200 },
  { id: 5, name: "Tibs", category: "Ethiopian", price: 300 },
  { id: 6, name: "Misir Wat", category: "Vegetarian", price: 150 },
  { id: 7, name: "Pasta", category: "Italian", price: 220 },
  { id: 8, name: "Injera Combo", category: "Ethiopian", price: 240 },
];

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const term = (params.get("search") ?? "").trim().toLowerCase();
  const page = Math.max(1, Number(params.get("page") ?? 1) || 1);
  const pageSize = 3;

  const filtered = foods.filter((food) =>
    ${food.name} ${food.category}.toLowerCase().includes(term)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;

  return NextResponse.json(
    {
      items: filtered.slice(start, start + pageSize),
      page: safePage,
      pageSize,
      total: filtered.length,
      totalPages,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}