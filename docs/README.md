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
- **Base de Datos**: PostgreSQL 

## Instalación

### Requisitos

- Node.js 20+
- npm o yarn


### Pasos

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno
4. Ejecutar migraciones SQL
5. Iniciar: `npm run dev`

## Docker

### Build

```shell
docker build -t red-team-tools:latest .
```


### Docker Compose

```shell
docker-compose up -d
```

### Push to DockerHub

```shell
docker tag red-team-tools:latest usuario/red-team-tools:latest
docker push usuario/red-team-tools:latest
```


## Credenciales

**email:** `demo@redteam.com`

**password:** `Demo@123456`

## Análisis de Seguridad

### SAST - SonarQube

```shell
npx sonar-scanner \
  -Dsonar.projectKey=red-team-tools \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000
```

### DAST - OWASP ZAP

```shell
docker run -t owasp/zap2docker-stable \
  zap-baseline.py -t https://tu-app.com
```

### Trivy

```shell
trivy image red-team-tools:latest
```

## Licencia

Uso exclusivo con fines educativos.
