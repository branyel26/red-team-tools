"use client"

import { useEffect } from "react"

export default function RegisterRedirect() {
  useEffect(() => {
    window.location.href = "/auth/register"
  }, [])

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <p>Redirigiendo...</p>
    </div>
  )
}
