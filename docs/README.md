# Red Team Tools

Plataforma web educativa para documentar y aprender sobre herramientas de Red Team y Pentesting.

## Características

- **Autenticación Segura**: Login y registro con validación completa
- **Gestión de Herramientas**: CRUD completo con documentación detallada
- **Comandos Documentados**: Cada herramienta incluye comandos, flags y ejemplos
- **Diseño Profesional**: Interfaz minimalista estilo academia de ciberseguridad

## Stack Tecnológico

- **Frontend**: Next.js 15, React 19, TailwindCSS 4
- **Backend**: Next.js API Routes, Server Components
- **Base de Datos**: PostgreSQL (Supabase)
- **Autenticación**: Supabase Auth con Row Level Security

## Instalación

### Requisitos

- Node.js 20+
- npm o yarn
- Cuenta de Supabase

### Pasos

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno
4. Ejecutar migraciones SQL
5. Iniciar: `npm run dev`

## Docker

### Build

\`\`\`bash
docker build -t red-team-tools:latest .
\`\`\`

### Run

\`\`\`bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=<url> \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=<key> \
  red-team-tools:latest
\`\`\`

### Docker Compose

\`\`\`bash
docker-compose up -d
\`\`\`

### Push to DockerHub

\`\`\`bash
docker tag red-team-tools:latest usuario/red-team-tools:latest
docker push usuario/red-team-tools:latest
\`\`\`

## Análisis de Seguridad

### SAST - SonarQube

```bash
npx sonar-scanner \
  -Dsonar.projectKey=red-team-tools \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000
```

### DAST - OWASP ZAP

\`\`\`bash
docker run -t owasp/zap2docker-stable \
  zap-baseline.py -t https://tu-app.vercel.app
\`\`\`

### Trivy

\`\`\`bash
trivy image red-team-tools:latest
\`\`\`

## Licencia

Uso exclusivo con fines educativos.
