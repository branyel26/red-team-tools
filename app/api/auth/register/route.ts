import { NextRequest, NextResponse } from "next/server"
import { hashPassword } from "@/lib/auth/password"
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

    if (password.length < 6) {
      return NextResponse.json(
        { message: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      )
    }

    const existingUser = getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { message: "El email ya está registrado" },
        { status: 409 }
      )
    }

    const hashedPassword = hashPassword(password)
    const user = saveUser({ email, password: hashedPassword })
    console.log(`[AUTH] Usuario registrado: ${email}`)

    const response = NextResponse.json({ success: true }, { status: 201 })
    createSession(response, email)
    return response
  } catch (error) {
    console.error("Error en registro:", error)
    return NextResponse.json(
      { message: "Error al registrarse" },
      { status: 500 }
    )
  }
}
