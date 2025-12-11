import { NextRequest, NextResponse } from "next/server"

export function createSession(response: NextResponse, email: string) {
  response.cookies.set({
    name: "rtt_session",
    value: email,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  })
  return response
}

export function getSession(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("rtt_session")?.value

    if (!sessionCookie) {
      return null
    }

    return {
      email: sessionCookie,
    }
  } catch (error) {
    console.error("Error al validar sesión:", error)
    return null
  }
}
