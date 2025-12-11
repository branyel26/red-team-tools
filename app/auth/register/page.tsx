"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import styles from "../auth.module.css"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
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
        errors.email = "La parte anterior a @ debe tener al menos 3 caracteres"
      }
    }

    // Contraseña
    if (password) {
      if (password.length < 6) {
        errors.password = "Mínimo 6 caracteres"
      }
      if (!/[A-Z]/.test(password)) {
        errors.password = "Debe contener al menos una mayúscula"
      }
      if (!/[0-9]/.test(password)) {
        errors.password = "Debe contener al menos un número"
      }
    }

    // Confirmar contraseña
    if (confirmPassword && password && password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden"
    }

    return {
      errors,
      isValid:
        email &&
        password &&
        confirmPassword &&
        Object.keys(errors).length === 0,
    }
  }, [email, password, confirmPassword])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validation.isValid) {
      setError("Por favor completa correctamente todos los campos")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        setSuccess("¡Registrado exitosamente! Redirigiendo...")
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 1500)
      } else {
        const data = await res.json()
        setError(data.message || "Error al registrarse")
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
        <h2>Crear Cuenta</h2>
        <p className={styles.subtitle}>Únete a Red Team Tools</p>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

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
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres, mayúscula y número"
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              disabled={loading}
              aria-invalid={!!validation.errors.confirmPassword}
            />
            {validation.errors.confirmPassword && (
              <div className="form-error">{validation.errors.confirmPassword}</div>
            )}
            {confirmPassword &&
              password &&
              password === confirmPassword &&
              !validation.errors.confirmPassword && (
                <div style={{ color: "#64c864", fontSize: "12px", marginTop: "4px" }}>
                  ✓ Las contraseñas coinciden
                </div>
              )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full"
            disabled={loading || !validation.isValid}
          >
            {loading ? "Registrando..." : "Crear Cuenta"}
          </button>
        </form>

        <p className={styles.footer}>
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  )
}
