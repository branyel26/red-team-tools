"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Logo } from "@/components/Logo"
import styles from "./dashboard.module.css"

interface Session {
  email: string
}

export default function DashboardPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session", {
          credentials: "include",
        })
        
        if (res.ok) {
          const data = await res.json()
          setSession(data)
        } else {
          setRedirecting(true)
          setTimeout(() => {
            window.location.href = "/auth/login"
          }, 500)
        }
      } catch (error) {
        console.error("Error al obtener sesión:", error)
        setRedirecting(true)
        setTimeout(() => {
          window.location.href = "/auth/login"
        }, 500)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { 
        method: "POST",
        credentials: "include",
      })
      window.location.href = "/"
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  if (loading || redirecting) {
    return (
      <div className={styles.loadingContainer}>
        <p>Cargando...</p>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Logo />
          <h1>Red Team Tools</h1>
        </div>
        <div className={styles.userSection}>
          <span className={styles.userEmail}>{session.email}</span>
          <button onClick={handleLogout} className="btn btn-secondary btn-sm">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <h2>Bienvenido al Dashboard</h2>
          <p className={styles.subtitle}>
            Accede a tu cuenta en Red Team Tools
          </p>

          <div className={styles.grid}>
            <Link href="/dashboard/tools" className={styles.card}>
              <h3>Herramientas</h3>
              <p>Gestiona tus herramientas y scripts</p>
            </Link>

            <Link href="/dashboard/docs" className={styles.card}>
              <h3>Documentación</h3>
              <p>Aprende técnicas y mejores prácticas</p>
            </Link>

            <div className={styles.card} style={{ opacity: 0.6 }}>
              <h3>Estadísticas</h3>
              <p>Próximamente...</p>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 Red Team Tools. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
