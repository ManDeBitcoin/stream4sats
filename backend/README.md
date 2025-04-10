# ⚡ stream4sats

Un sistema open-source para mostrar donaciones Lightning en vivo en tus transmisiones. Se conecta con BTCPay Server, OBS Studio y muestra Zaps en tiempo real.

## 🚀 Componentes
- **Backend**: Node.js + SQLite. Maneja los Zaps y se conecta a OBS.
- **Frontend**: React con WebSocket para mostrar los Zaps en tiempo real.
- **TTS**: Lee los comentarios en voz alta si está activado.

## 🛠 Requisitos
- Node.js >= 18
- Docker (opcional)
- BTCPay Server con metadata personalizado (`event`, `user`, `comment`)

## ⚙️ Instalación rápida

```bash
git clone https://github.com/tuusuario/stream4sats.git
cd stream4sats/backend
cp .env.example .env
npm install
node index.js
```

## 🐳 Uso con Docker

```bash
cd backend
docker build -t stream4sats-backend .
docker run -p 7777:7777 --env-file .env stream4sats-backend
```

## 🖥 Frontend

```bash
cd frontend
npm install
npm start
```

## 🌍 Producción

Compila el frontend:

```bash
npm run build
```

Y sirve la carpeta `frontend_build/` como sitio estático.

## 🧩 Personalización

Puedes modificar los eventos y cómo se activan en `index.js`. También puedes integrar sonidos, animaciones o cambiar escenas en OBS desde ahí.

## 📃 Licencia

MIT - Puedes usarlo y modificarlo libremente.