"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import styles from "../auth.module.css"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Validaciones en tiempo real
  const validation = useMemo(() => {
    const errors: { [key: string]: string } = {}

    // Email
    if (email) {
      if (!email.includes("@")) {
        errors.email = "El email debe contener @"
      } else if (!email.includes(".")) {
        errors.email = "El email debe tener un dominio válido"
      } else if (email.split("@")[0].length < 3) {
        errors.email = "Email inválido"
      }
    }

    // Contraseña
    if (password && password.length < 6) {
      errors.password = "Mínimo 6 caracteres"
    }

    return {
      errors,
      isValid: email && password && Object.keys(errors).length === 0,
    }
  }, [email, password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validation.isValid) {
      setError("Por favor completa correctamente todos los campos")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })

      if (res.ok) {
        window.location.href = "/dashboard"
      } else {
        const data = await res.json()
        setError(data.message || "Email o contraseña incorrectos")
      }
    } catch (err) {
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Iniciar Sesión</h2>
        <p className={styles.subtitle}>Accede a Red Team Tools</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              disabled={loading}
              aria-invalid={!!validation.errors.email}
            />
            {validation.errors.email && (
              <div className="form-error">{validation.errors.email}</div>
            )}
            {email && !validation.errors.email && (
              <div style={{ color: "#64c864", fontSize: "12px", marginTop: "4px" }}>
                ✓ Email válido
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              disabled={loading}
              aria-invalid={!!validation.errors.password}
            />
            {validation.errors.password && (
              <div className="form-error">{validation.errors.password}</div>
            )}
            {password && !validation.errors.password && (
              <div style={{ color: "#64c864", fontSize: "12px", marginTop: "4px" }}>
                ✓ Contraseña válida
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full"
            disabled={loading || !validation.isValid}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className={styles.footer}>
          ¿No tienes cuenta?{" "}
          <Link href="/register">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  )
}
