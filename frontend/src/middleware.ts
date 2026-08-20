import { NextRequest, NextResponse } from "next/server";

const REFRESH_COOKIE_NAME = "foodfighter_refresh_token";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  const hasRefreshCookie = request.cookies.has(REFRESH_COOKIE_NAME);

  if (!hasRefreshCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/history/:path*",
    "/profile/:path*",
    "/payment-account/:path*",
    "/room/:path*",
    "/bills/:path*",
  ],
};
