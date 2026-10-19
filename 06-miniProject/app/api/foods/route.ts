import { NextRequest, NextResponse } from "next/server";
import { getFoods } from "@/lib/foods";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get("search") ?? "";
  const requestedPage = Number(searchParams.get("page") ?? "1");

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const result = getFoods(search, page);

  return NextResponse.json(
    {
      success: true,
      ...result,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}