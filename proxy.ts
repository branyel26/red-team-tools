import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  // Protected routes
  const protectedPaths = ["/dashboard"]
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Check for session cookie
  const sessionCookie = request.cookies.get("rtt_session")

  if (isProtectedPath && !sessionCookie) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Redirect logged-in users away from auth pages
  const authPaths = ["/auth/login", "/auth/register"]
  const isAuthPath = authPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (isAuthPath && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
