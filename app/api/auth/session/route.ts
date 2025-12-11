import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"

export async function GET(request: NextRequest) {
  try {
    const session = getSession(request)
    
    if (!session) {
      return NextResponse.json(
        { message: "No hay sesión activa" },
        { status: 401 }
      )
    }

    return NextResponse.json(session)
  } catch (error) {
    console.error("Error al obtener sesión:", error)
    return NextResponse.json(
      { message: "Error al obtener sesión" },
      { status: 500 }
    )
  }
}
