#!/bin/sh

# Ensure default users file exists
if [ ! -f /app/users.json ]; then
  echo "[ENTRYPOINT] Creating default users.json..."
  cat > /app/users.json << 'EOF'
[
  {
    "id": "user-default-admin",
    "email": "admin@redteam.com",
    "password": "QWRtaW5AMTIzNDU2",
    "createdAt": "2025-12-11T23:35:59.118Z"
  },
  {
    "id": "user-default-demo",
    "email": "demo@redteam.com",
    "password": "RGVtb0AxMjM0NTY=",
    "createdAt": "2025-12-11T23:35:59.119Z"
  }
]
EOF
  echo "[ENTRYPOINT] ✅ Default users created"
else
  echo "[ENTRYPOINT] ✅ users.json already exists"
fi

# Start the application
exec node server.js
