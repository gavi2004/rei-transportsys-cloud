#!/bin/bash

# Script de configuración para Coolify
# Este script te guía en la configuración de servicios múltiples

echo "🚀 Configuración de Coolify para TransportSys"
echo "=============================================="
echo ""

echo "📋 Información de servicios:"
echo ""
echo "1️⃣  FRONTEND"
echo "   Dominio: pioneros.bitforges.com"
echo "   Puerto: 3000"
echo "   Build Context: frontend/"
echo "   Dockerfile: frontend/Dockerfile"
echo ""

echo "2️⃣  BACKEND API"
echo "   Dominio: api-pioneros.bitforges.com" 
echo "   Puerto: 3500"
echo "   Build Context: backend/"
echo "   Dockerfile: backend/Dockerfile"
echo ""

echo "3️⃣  SERVICIOS INTERNOS (sin dominio público)"
echo "   - PDF Service: puerto 5001"
echo "   - MongoDB: puerto 27017"
echo ""

echo "🔧 Variables de entorno necesarias:"
echo ""
echo "Frontend:"
echo "   NODE_ENV=production"
echo "   API_URL=https://api-pioneros.bitforges.com"
echo ""
echo "Backend:"
echo "   NODE_ENV=production"
echo "   PORT=3500"
echo "   HOST=0.0.0.0"
echo "   MONGO_URI=mongodb://mongo:27017/transportsys"
echo "   CORS_ORIGIN=https://pioneros.bitforges.com,https://api-pioneros.bitforges.com"
echo ""

echo "📝 Pasos en Coolify:"
echo "1. Crear nuevo proyecto desde Git"
echo "2. Configurar Frontend con dominio pioneros.bitforges.com"
echo "3. Configurar Backend con dominio api-pioneros.bitforges.com"
echo "4. Agregar servicios internos (PDF y MongoDB)"
echo "5. Configurar red interna entre servicios"
echo ""

echo "🔍 Verificación:"
echo "Ejecuta: node verify-deployment.js"
echo ""

echo "✅ ¡Listo! Usa este script como referencia durante la configuración."