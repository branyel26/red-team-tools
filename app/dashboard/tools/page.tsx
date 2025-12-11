"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import styles from "../dashboard.module.css"

interface Tool {
  id: string
  name: string
  description: string
  category: string
  difficulty: "Principiante" | "Intermedio" | "Avanzado"
  icon: string
}

const tools: Tool[] = [
  {
    id: "nmap",
    name: "Nmap",
    description: "Explorador de red y auditor de seguridad. Utilizado para descubrimiento de puertos y mapeo de redes.",
    category: "Reconocimiento",
    difficulty: "Intermedio",
    icon: "🔍",
  },
  {
    id: "nikto",
    name: "Nikto",
    description: "Escáner de vulnerabilidades web. Identifica misconfiguraciones y vulnerabilidades comunes en servidores web.",
    category: "Análisis Web",
    difficulty: "Principiante",
    icon: "🕷️",
  },
  {
    id: "burp-suite",
    name: "Burp Suite",
    description: "Suite completa de testing de seguridad web. Incluye proxy, scanner, repeater y más herramientas.",
    category: "Análisis Web",
    difficulty: "Avanzado",
    icon: "🔐",
  },
  {
    id: "metasploit",
    name: "Metasploit Framework",
    description: "Framework para desarrollo y ejecución de exploits. Herramienta esencial para pentesting.",
    category: "Explotación",
    difficulty: "Avanzado",
    icon: "⚔️",
  },
  {
    id: "wireshark",
    name: "Wireshark",
    description: "Analizador de protocolos de red. Captura y examina tráfico de red en tiempo real.",
    category: "Análisis de Tráfico",
    difficulty: "Intermedio",
    icon: "📡",
  },
  {
    id: "hashcat",
    name: "Hashcat",
    description: "Herramienta de recuperación de contraseñas. Realiza ataques de fuerza bruta y diccionario contra hashes.",
    category: "Crack de Contraseñas",
    difficulty: "Intermedio",
    icon: "🔓",
  },
  {
    id: "sqlmap",
    name: "SQLMap",
    description: "Herramienta de automación de inyección SQL. Detecta y explota vulnerabilidades de SQL injection.",
    category: "Análisis Web",
    difficulty: "Intermedio",
    icon: "💾",
  },
  {
    id: "aircrack",
    name: "Aircrack-ng",
    description: "Suite completa para auditoría de redes WiFi. Incluye captura y cracking de contraseñas.",
    category: "WiFi",
    difficulty: "Avanzado",
    icon: "📶",
  },
  {
    id: "hydra",
    name: "Hydra",
    description: "Herramienta de ataque de fuerza bruta paralela. Compatible con múltiples protocolos.",
    category: "Crack de Contraseñas",
    difficulty: "Intermedio",
    icon: "💧",
  },
  {
    id: "gobuster",
    name: "Gobuster",
    description: "Herramienta de fuerza bruta para directorios y dominios. Escrita en Go, muy rápida.",
    category: "Reconocimiento",
    difficulty: "Principiante",
    icon: "👻",
  },
]

export default function ToolsPage() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session", { credentials: "include" })
      if (res.ok) {
        setSession(await res.json())
      } else {
        window.location.href = "/auth/login"
      }
      setLoading(false)
    }
    fetchSession()
  }, [])

  const categories = ["Reconocimiento", "Análisis Web", "Explotación", "Análisis de Tráfico", "Crack de Contraseñas", "WiFi"]
  const filteredTools = selectedCategory ? tools.filter((t) => t.category === selectedCategory) : tools

  if (loading) return <div className={styles.container}>Cargando...</div>
  if (!session) return null

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h1 style={{ margin: 0 }}>Herramientas Red Team</h1>
          <p style={{ color: "var(--text-secondary)", margin: 0 }}>
            Aprende sobre las herramientas más usadas en pentesting y auditoría de seguridad
          </p>
        </div>
        <Link href="/dashboard" className="btn btn-secondary">
          ← Atrás
        </Link>
      </div>

      {/* Filtros */}
      <div style={{ marginBottom: "24px", padding: "16px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
        <h3 style={{ marginBottom: "12px", fontSize: "14px" }}>Categorías</h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => setSelectedCategory(null)}
            className={`btn ${!selectedCategory ? "btn-primary" : "btn-secondary"}`}
            style={{ fontSize: "12px", padding: "6px 12px" }}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn ${selectedCategory === cat ? "btn-primary" : "btn-secondary"}`}
              style={{ fontSize: "12px", padding: "6px 12px" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Herramientas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {filteredTools.map((tool) => (
          <Link
            key={tool.id}
            href={`/dashboard/tools/${tool.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card" style={{ cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{tool.icon}</div>
              <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>{tool.name}</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "12px", flex: 1 }}>{tool.description}</p>
              <div style={{ display: "flex", gap: "8px", justifyContent: "space-between", marginTop: "auto" }}>
                <span
                  style={{
                    fontSize: "12px",
                    padding: "4px 8px",
                    backgroundColor: "var(--primary)",
                    borderRadius: "var(--radius-sm)",
                    color: "white",
                  }}
                >
                  {tool.category}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    padding: "4px 8px",
                    backgroundColor:
                      tool.difficulty === "Principiante"
                        ? "#64c864"
                        : tool.difficulty === "Intermedio"
                          ? "#ffb84d"
                          : "#ff6b6b",
                    borderRadius: "var(--radius-sm)",
                    color: tool.difficulty === "Intermedio" ? "#000" : "white",
                  }}
                >
                  {tool.difficulty}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
