# syntax=docker/dockerfile:1

# Red Team Tools - Production Dockerfile
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=1997

COPY --from=builder /app/public ./public
RUN mkdir -p .next

# Next.js standalone output
COPY --from=builder --chown=0:0 /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 1997

CMD ["node", "server.js"]
