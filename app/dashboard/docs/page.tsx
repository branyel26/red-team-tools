"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface Session {
  email: string
}

export default function DocsPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

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

  if (loading) return <div style={{ textAlign: "center", paddingTop: "2rem" }}>Cargando...</div>
  if (!session) return null

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, var(--bg) 0%, var(--bg-secondary) 100%)" }}>
      <nav style={{ padding: "2rem", borderBottom: "2px solid var(--primary)", background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,30,0.95) 100%)" }}>
        <Link href="/dashboard" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "500", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          ← Volver al Dashboard
        </Link>
      </nav>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
        {/* Hero Section */}
        <section style={{ marginBottom: "4rem", textAlign: "center" }}>
          <h1 style={{ background: "linear-gradient(135deg, var(--primary) 0%, #ff6b6b 100%)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "40px", marginBottom: "1rem" }}>
            Documentación de Red Team Tools
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
            Guía completa sobre técnicas de prueba de penetración, seguridad ofensiva y metodologías de testing ético
          </p>
        </section>

        {/* Table of Contents */}
        <section style={{ marginBottom: "4rem", padding: "2rem", background: "linear-gradient(135deg, rgba(20,20,30,0.8) 0%, rgba(30,30,50,0.6) 100%)", borderRadius: "var(--radius-lg)", border: "2px solid var(--border)" }}>
          <h2 style={{ color: "var(--primary)", marginTop: 0 }}>📑 Tabla de Contenidos</h2>
          <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            <li><a href="#intro" style={{ color: "var(--primary)", textDecoration: "none" }}>▶ Introducción al Red Team</a></li>
            <li><a href="#fases" style={{ color: "var(--primary)", textDecoration: "none" }}>▶ Fases de una Prueba de Penetración</a></li>
            <li><a href="#herramientas" style={{ color: "var(--primary)", textDecoration: "none" }}>▶ Categorías de Herramientas</a></li>
            <li><a href="#metodologia" style={{ color: "var(--primary)", textDecoration: "none" }}>▶ Metodologías Estándar</a></li>
            <li><a href="#legal" style={{ color: "var(--primary)", textDecoration: "none" }}>▶ Consideraciones Legales</a></li>
            <li><a href="#mejores" style={{ color: "var(--primary)", textDecoration: "none" }}>▶ Mejores Prácticas</a></li>
          </ul>
        </section>

        {/* Introduction */}
        <section id="intro" style={{ marginBottom: "3rem" }}>
          <h2 style={{ color: "var(--primary)" }}>🎯 Introducción al Red Team</h2>
          <div style={{ background: "linear-gradient(135deg, rgba(20,20,30,0.8) 0%, rgba(30,30,50,0.6) 100%)", padding: "2rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
            <p>Un <strong>Red Team</strong> es un grupo de profesionales de seguridad que actúan como adversarios para evaluar la postura defensiva de una organización. Los Red Teams realizan pruebas de penetración éticas para identificar vulnerabilidades antes de que los atacantes reales lo hagan.</p>
            <h3 style={{ color: "var(--text)" }}>Objetivos Principales:</h3>
            <ul style={{ color: "var(--text-secondary)" }}>
              <li>Identificar vulnerabilidades técnicas en sistemas y aplicaciones</li>
              <li>Evaluar la efectividad de controles de seguridad existentes</li>
              <li>Simular ataques reales para medir la capacidad de detección y respuesta</li>
              <li>Proveer recomendaciones accionables para mejorar la seguridad</li>
              <li>Crear conciencia de seguridad en la organización</li>
            </ul>
          </div>
        </section>

        {/* Phases */}
        <section id="fases" style={{ marginBottom: "3rem" }}>
          <h2 style={{ color: "var(--primary)" }}>📋 Fases de una Prueba de Penetración</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {[
              { title: "1. Reconocimiento", desc: "Recopilación de información pública y privada del objetivo", tools: "Nmap, Gobuster, Google Dorking" },
              { title: "2. Escaneo y Enumeración", desc: "Identificación de sistemas, servicios y puertos abiertos", tools: "Nmap, Nikto, Wireshark" },
              { title: "3. Análisis de Vulnerabilidades", desc: "Búsqueda de debilidades explotables en sistemas", tools: "Nikto, Burp Suite, SQLMap" },
              { title: "4. Explotación", desc: "Ejecución controlada de exploits para validar vulnerabilidades", tools: "Metasploit, Burp Suite" },
              { title: "5. Post-Explotación", desc: "Escalada de privilegios y mantenimiento de acceso", tools: "Hydra, Metasploit, Aircrack-ng" },
              { title: "6. Reporte", desc: "Documentación de hallazgos con recomendaciones", tools: "Documentación técnica" },
            ].map((phase, idx) => (
              <div key={idx} style={{ background: "linear-gradient(135deg, rgba(20,20,30,0.8) 0%, rgba(30,30,50,0.6) 100%)", padding: "1.5rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                <h3 style={{ color: "var(--primary)", marginTop: 0 }}>{phase.title}</h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>{phase.desc}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "12px" }}><strong>Herramientas:</strong> {phase.tools}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section id="herramientas" style={{ marginBottom: "3rem" }}>
          <h2 style={{ color: "var(--primary)" }}>🛠️ Categorías de Herramientas</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
            {[
              { cat: "Reconocimiento", icon: "🔍", desc: "Recopilación de información y mapeo de red", tools: ["Nmap", "Gobuster", "Wireshark"] },
              { cat: "Análisis Web", icon: "🕷️", desc: "Testing de vulnerabilidades en aplicaciones web", tools: ["Nikto", "Burp Suite", "SQLMap"] },
              { cat: "Crack de Contraseñas", icon: "🔓", desc: "Recuperación y validación de credenciales", tools: ["Hashcat", "Hydra"] },
              { cat: "Explotación", icon: "⚔️", desc: "Desarrollo y ejecución de exploits", tools: ["Metasploit Framework"] },
              { cat: "WiFi", icon: "📶", desc: "Auditoría de redes inalámbricas", tools: ["Aircrack-ng"] },
              { cat: "Post-Explotación", icon: "👻", desc: "Enumeración y escalada post-compromiso", tools: ["Metasploit", "Gobuster"] },
            ].map((cat, idx) => (
              <div key={idx} style={{ background: "linear-gradient(135deg, rgba(20,20,30,0.8) 0%, rgba(30,30,50,0.6) 100%)", padding: "1.5rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                <h3 style={{ color: "var(--primary)", marginTop: 0 }}>{cat.icon} {cat.cat}</h3>
                <p style={{ color: "var(--text-secondary)" }}>{cat.desc}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                  <strong>Herramientas:</strong> {cat.tools.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section id="metodologia" style={{ marginBottom: "3rem" }}>
          <h2 style={{ color: "var(--primary)" }}>📚 Metodologías Estándar</h2>
          <div style={{ background: "linear-gradient(135deg, rgba(20,20,30,0.8) 0%, rgba(30,30,50,0.6) 100%)", padding: "2rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
            <h3 style={{ color: "var(--primary)" }}>OWASP Testing Guide</h3>
            <p style={{ color: "var(--text-secondary)" }}>Marco de referencia para testing de aplicaciones web. Define 12 categorías de vulnerabilidades incluyendo inyección SQL, XSS, CSRF y más.</p>
            
            <h3 style={{ color: "var(--primary)", marginTop: "2rem" }}>OSSTMM (Open Source Security Testing Methodology Manual)</h3>
            <p style={{ color: "var(--text-secondary)" }}>Metodología comprehensiva que cubre testing de seguridad física, redes, aplicaciones web y telecomunicaciones.</p>
            
            <h3 style={{ color: "var(--primary)", marginTop: "2rem" }}>NIST Cybersecurity Framework</h3>
            <p style={{ color: "var(--text-secondary)" }}>Framework del gobierno de EE.UU. para gestión de riesgo cibernético. Enfoque en Identificar, Proteger, Detectar, Responder y Recuperarse.</p>
            
            <h3 style={{ color: "var(--primary)", marginTop: "2rem" }}>PTES (Penetration Testing Execution Standard)</h3>
            <p style={{ color: "var(--text-secondary)" }}>Estándar de ejecución con 7 fases: Pre-engagement, Reconocimiento, Escaneo, Enumeración, Vulnerabilidad Analysis, Explotación, Post-Explotación.</p>
          </div>
        </section>

        {/* Legal */}
        <section id="legal" style={{ marginBottom: "3rem" }}>
          <h2 style={{ color: "var(--primary)" }}>⚖️ Consideraciones Legales</h2>
          <div style={{ background: "linear-gradient(135deg, rgba(255,0,0,0.1) 0%, rgba(255,107,107,0.05) 100%)", padding: "2rem", borderRadius: "var(--radius-lg)", border: "2px solid var(--primary)" }}>
            <div style={{ color: "var(--text)", lineHeight: "1.8" }}>
              <p><strong>⚠️ IMPORTANTE:</strong> Todas las actividades de seguridad ofensiva DEBEN realizarse dentro de un marco legal y ético.</p>
              
              <h3 style={{ color: "var(--primary)" }}>Requisitos Previos:</h3>
              <ul>
                <li>✅ Autorización escrita explícita del propietario o administrador del sistema</li>
                <li>✅ Acuerdo claro sobre alcance, objetivos y limitaciones</li>
                <li>✅ Definición de horarios permitidos para testing</li>
                <li>✅ Cumplimiento con regulaciones locales (GDPR, CCPA, etc.)</li>
              </ul>

              <h3 style={{ color: "var(--primary)", marginTop: "1.5rem" }}>Responsabilidades Éticas:</h3>
              <ul>
                <li>🔒 Mantener confidencialidad de datos encontrados</li>
                <li>🔒 No causar daño o disrupciones innecesarias</li>
                <li>🔒 Reportar vulnerabilidades responsablemente</li>
                <li>🔒 Destruir acceso después del testing</li>
                <li>🔒 Documentar todas las acciones realizadas</li>
              </ul>

              <h3 style={{ color: "var(--primary)", marginTop: "1.5rem" }}>Cumplimiento Legal:</h3>
              <ul>
                <li>⚖️ En muchos países, hacking sin autorización es delito (Computer Fraud and Abuse Act en EE.UU.)</li>
                <li>⚖️ Regulaciones de privacidad de datos pueden aplicarse</li>
                <li>⚖️ Seguros de responsabilidad civil profesional recomendados</li>
                <li>⚖️ Certificaciones profesionales requieren aceptación de código ético</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section id="mejores" style={{ marginBottom: "4rem" }}>
          <h2 style={{ color: "var(--primary)" }}>⭐ Mejores Prácticas</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {[
              { title: "Planificación", tips: ["Define objetivos claros", "Establece alcance explícito", "Obtén autorización escrita", "Coordina con el cliente"] },
              { title: "Ejecución", tips: ["Usa una máquina de testing dedicada", "Mantén registros detallados", "Prueba en dev primero", "No destruyas datos innecesariamente"] },
              { title: "Seguridad Operacional", tips: ["Usa VPN para actividades", "Protege herramientas y datos", "Usa cuentas separadas", "Aplica principio de mínimo privilegio"] },
              { title: "Reportes", tips: ["Documenta todos los hallazgos", "Prioriza por riesgo", "Incluye evidencia", "Proporciona remediación clara"] },
            ].map((section, idx) => (
              <div key={idx} style={{ background: "linear-gradient(135deg, rgba(20,20,30,0.8) 0%, rgba(30,30,50,0.6) 100%)", padding: "1.5rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                <h3 style={{ color: "var(--primary)", marginTop: 0 }}>{section.title}</h3>
                <ul style={{ color: "var(--text-secondary)", fontSize: "14px", margin: 0 }}>
                  {section.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section style={{ marginBottom: "3rem", padding: "2rem", background: "linear-gradient(135deg, rgba(20,20,30,0.8) 0%, rgba(30,30,50,0.6) 100%)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
          <h2 style={{ color: "var(--primary)", marginTop: 0 }}>📖 Recursos Recomendados</h2>
          <ul style={{ color: "var(--text-secondary)" }}>
            <li><strong>OWASP Top 10:</strong> Lista de vulnerabilidades críticas en aplicaciones web</li>
            <li><strong>CVE Database:</strong> Registro de vulnerabilidades conocidas y exploits públicos</li>
            <li><strong>HackTheBox:</strong> Plataforma para practicar habilidades de hacking ético</li>
            <li><strong>TryHackMe:</strong> Laboratorios interactivos de ciberseguridad</li>
            <li><strong>SANS Cyber Aces:</strong> Tutoriales gratuitos de seguridad</li>
            <li><strong>PortSwigger Academy:</strong> Cursos de seguridad web (incluye Burp Suite)</li>
          </ul>
        </section>

        {/* CTA */}
        <section style={{ textAlign: "center", padding: "2rem", background: "linear-gradient(135deg, rgba(255,0,0,0.05) 0%, rgba(255,107,107,0.02) 100%)", borderRadius: "var(--radius-lg)", border: "2px solid var(--primary)" }}>
          <h2 style={{ color: "var(--primary)" }}>Listo para Practicar?</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>Explora nuestras 10 herramientas de Red Team con guías completas de comandos y casos de uso.</p>
          <Link href="/dashboard/tools" style={{ display: "inline-block", padding: "12px 32px", background: "linear-gradient(135deg, var(--primary) 0%, #ff6b6b 100%)", color: "white", textDecoration: "none", borderRadius: "var(--radius-md)", fontWeight: "600", transition: "all 0.3s ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(255,0,0,0.3)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            Ver Herramientas →
          </Link>
        </section>
      </main>

      <footer style={{ padding: "2rem", textAlign: "center", borderTop: "2px solid var(--border)", background: "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(20,20,30,0.5) 100%)", color: "var(--text-muted)", fontSize: "12px", marginTop: "3rem" }}>
        <p>&copy; 2025 Red Team Tools. Contenido educativo. Úsalo responsablemente.</p>
      </footer>
    </div>
  )
}
