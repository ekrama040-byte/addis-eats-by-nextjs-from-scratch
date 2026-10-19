import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = process.env.SESSION_SECRET;
const key = secret ? new TextEncoder().encode(secret) : null;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("addis-eats-session")?.value;

  if (!token || !key) {
    const url = new URL("/sign-in", request.url);

    url.searchParams.set(
      "next",
      request.nextUrl.pathname + request.nextUrl.search
    );

    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    if (
      typeof payload.sub !== "string" ||
      !["customer", "staff"].includes(String(payload.role))
    ) {
      throw new Error("Invalid session");
    }

    return NextResponse.next();
  } catch {
    const url = new URL("/sign-in", request.url);

    url.searchParams.set(
      "next",
      request.nextUrl.pathname + request.nextUrl.search
    );

    const response = NextResponse.redirect(url);
    response.cookies.delete("addis-eats-session");

    return response;
  }
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/orders/:path*",
    "/kitchen/:path*",
  ],
};