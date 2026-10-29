import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes jinhe sirf logged-in users access kar sakte hain
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // Auth token ko cookies ya headers se check karna
  // (Yahan hum token ko cookie ya custom header ke tor par check kar sakte hain)
  const token = request.cookies.get("token")?.value;

  // Agar user unprotected/login page par hai aur token mojood hai, toh usay dashboard par bhej sakte hain (optional)
  if (isProtectedRoute && !token) {
    // Agar koi unauthorized user protected page access kare, toh 401 return karne ki bajaye
    // UX ke mutabiq usay /login par redirect karna sabse behtar hota hai.
    // Lekin agar API route hai ya strict 401 chahiye, toh response handle kiya ja sakta hai.
    
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname); // Wapas usi page par laane ke liye
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Kon kon se routes par middleware chalega
export const config = {
  matcher: ["/dashboard/:path*"],
};