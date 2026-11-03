import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get("app_session")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/login");
  const isProtectedPage = pathname.startsWith("/dashboard");

  // 1. Agar user protected page par ja raha hai aur session cookie nahi hai -> Login par bhej dein
  if (isProtectedPage && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Agar user pehle se logged-in hai aur login page par jana chahta hai -> Dashboard par redirect karein
  if (isAuthPage && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};