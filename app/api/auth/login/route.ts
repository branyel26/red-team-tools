import { NextRequest, NextResponse } from "next/server"
import { validatePassword } from "@/lib/auth/password"
import { createSession } from "@/lib/auth/session"
import { getUserByEmail } from "@/lib/db/store"

// Usuarios por defecto HARDCODEADOS - no necesitan base de datos
const DEFAULT_USERS: Record<string, string> = {
  "admin@redteam.com": "Admin@123456",
  "demo@redteam.com": "Demo@123456",
}

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

    // 1. Primero verificar usuarios por defecto (sin DB)
    if (DEFAULT_USERS[email]) {
      if (password === DEFAULT_USERS[email]) {
        const response = NextResponse.json({ success: true })
        createSession(response, email)
        return response
      }
      return NextResponse.json(
        { message: "Email o contraseña incorrectos" },
        { status: 401 }
      )
    }

    // 2. Si no es usuario por defecto, buscar en store/DB
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
