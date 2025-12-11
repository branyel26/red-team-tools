"use client"

import Link from "next/link"
import { Logo } from "@/components/Logo"
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Logo />
          <h1>Red Team Tools</h1>
        </div>
        <nav className={styles.nav}>
          <Link href="/login" className="btn btn-secondary btn-sm">
            Login
          </Link>
          <Link href="/register" className="btn btn-primary btn-sm">
            Registro
          </Link>
        </nav>
      </div>

      <main className={styles.hero}>
        <div className={styles.content}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "16px" }}>
            <Logo />
            <h1 style={{ margin: 0 }}>Red Team Tools</h1>
          </div>
          <p className={styles.subtitle}>
            Plataforma educativa de herramientas y técnicas de Red Team y Pentesting
          </p>
          <div className={styles.cta}>
            <Link href="/register" className="btn btn-primary btn-lg">
              Comenzar Ahora
            </Link>
            <Link href="/login" className="btn btn-secondary btn-lg">
              Inicia Sesión
            </Link>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 Red Team Tools. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
