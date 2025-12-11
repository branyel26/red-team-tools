"use client"

import { useEffect } from "react"

export default function LoginRedirect() {
  useEffect(() => {
    window.location.href = "/auth/login"
  }, [])

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <p>Redirigiendo...</p>
    </div>
  )
}
