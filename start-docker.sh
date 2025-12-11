#!/bin/bash

# Script para ejecutar Red Team Tools en Docker
# Este script inicia todos los servicios necesarios

echo "🚀 Iniciando Red Team Tools..."
echo ""

# Cambiar al directorio de la aplicación
cd /Users/user/Desktop/red-team-tools

# Detener cualquier instancia anterior
echo "🛑 Deteniendo contenedores anteriores..."
docker-compose down 2>/dev/null

# Limpiar el build anterior (opcional)
# docker system prune -f

echo ""
echo "🔨 Construyendo la imagen Docker..."
docker build -t redteam-app:latest .

echo ""
echo "✅ Iniciando los contenedores..."
docker-compose up -d

echo ""
echo "⏳ Esperando a que los servicios estén listos..."
sleep 5

echo ""
echo "📊 Estado de los contenedores:"
docker-compose ps

echo ""
echo "🎉 ¡Red Team Tools está corriendo!"
echo ""
echo "📍 Aplicación: http://localhost:1997"
echo "🗄️  Base de datos: localhost:5432 (usuario: redteam)"
echo ""
echo "📝 Ver logs: docker-compose logs app -f"
echo "🛑 Detener: docker-compose down"
