#!/bin/sh
set -e

echo "[ENTRYPOINT] Starting... Running as: $(whoami)"
echo "[ENTRYPOINT] Fixing /app directory permissions..."

# We're running as root (or nextjs), make sure /app is writable
mkdir -p /app/data
chmod 777 /app /app/data

echo "[ENTRYPOINT] /app permissions:"
ls -ld /app
echo "[ENTRYPOINT] /app/data permissions:"
ls -ld /app/data

echo "[ENTRYPOINT] Starting Node.js application..."
exec "$@"
