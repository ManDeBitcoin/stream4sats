#!/bin/bash

echo "🔁 Iniciando stream4sats..."

# Navegar al backend
cd "$(dirname "$0")/backend" || exit
echo "📦 Instalando dependencias del backend..."
npm install

# Iniciar backend
echo "🚀 Levantando backend..."
node index.js &

# Esperar unos segundos
sleep 3

# Navegar al frontend
cd ../frontend || exit
echo "📦 Instalando dependencias del frontend..."
npm install

# Iniciar frontend
echo "🌐 Abriendo frontend en http://localhost:3000 ..."
npm start
