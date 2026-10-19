import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = process.env.SESSION_SECRET;

const key = secret
  ? new TextEncoder().encode(secret)
  : null;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("addis-eats-session")?.value;

  if (!token || !key) {
    const signInUrl = new URL("/sign-in", request.url);

    signInUrl.searchParams.set(
      "next",
      request.nextUrl.pathname + request.nextUrl.search
    );

    return NextResponse.redirect(signInUrl);
  }

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    if (
      typeof payload.sub !== "string" ||
      (payload.role !== "customer" && payload.role !== "staff")
    ) {
      throw new Error("Invalid session");
    }

    return NextResponse.next();
  } catch {
    const signInUrl = new URL("/sign-in", request.url);

    signInUrl.searchParams.set(
      "next",
      request.nextUrl.pathname + request.nextUrl.search
    );

    const response = NextResponse.redirect(signInUrl);
    response.cookies.delete("addis-eats-session");

    return response;
  }
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"],
};