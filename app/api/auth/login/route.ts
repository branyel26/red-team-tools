import { NextRequest, NextResponse } from "next/server"
import { validatePassword, hashPassword } from "@/lib/auth/password"
import { createSession } from "@/lib/auth/session"
import { getUserByEmail, saveUser } from "@/lib/db/store"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email y contraseña son requeridos" },
        { status: 400 }
      )
    }

    const user = getUserByEmail(email)

    if (!user || !validatePassword(password, user.password)) {
      return NextResponse.json(
        { message: "Email o contraseña incorrectos" },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ success: true })
    createSession(response, email)
    return response
  } catch (error) {
    console.error("Error en login:", error)
    return NextResponse.json(
      { message: "Error al iniciar sesión" },
      { status: 500 }
    )
  }
}
