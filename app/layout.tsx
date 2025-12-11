import type { Metadata } from "next"
import "./globals.css"
import { Logo } from "@/components/Logo"

export const metadata: Metadata = {
  title: "Red Team Tools",
  description: "Plataforma educativa de herramientas Red Team y Pentesting",
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <style>{`
          :root {
            --logo-component: true;
          }
        `}</style>
        {children}
      </body>
    </html>
  )
}
