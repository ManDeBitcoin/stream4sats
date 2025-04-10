# ⚡ stream4sats

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/backend-Node.js-green)
![React](https://img.shields.io/badge/frontend-React-blue)

> Recibe **Zaps** en vivo desde BTCPay Server y muéstralos en tu stream con alertas visuales en OBS. 
> Proyecto 100% local, sin custodios y potenciado por Bitcoin Lightning.

---

## 🎯 ¿Qué es stream4sats?

**stream4sats** es un sistema modular que:

- 🔄 Recibe pagos Lightning en tiempo real desde BTCPay Server
- 📣 Muestra alertas visuales en OBS Studio
- 💬 Lee mensajes con voz (TTS)
- 🧠 Guarda y muestra historial de Zaps en una interfaz web

---

## 🚀 Estructura del proyecto

| Carpeta / Archivo          | Descripción                                 |
|----------------------------|---------------------------------------------|
| `backend/`                 | Servidor Express + SQLite + WebSocket       |
| `frontend/`                | Interfaz React en tiempo real               |
| `frontend_build/`          | Versión compilada para producción           |
| `run_stream4sats.bat`      | Script de arranque para Windows             |
| `run_stream4sats.sh`       | Script de arranque para Linux/macOS         |

---

## 🛠 Requisitos

- Node.js 18 o superior
- OBS Studio con plugin obs-websocket (v5+)
- BTCPay Server con metadata personalizado
- Docker (opcional)

---

## ⚙️ Cómo usar

```bash
git clone https://github.com/tuusuario/stream4sats.git
cd stream4sats

# Windows
run_stream4sats.bat

# Linux/macOS
chmod +x run_stream4sats.sh
./run_stream4sats.sh
```

---

## ⚡ Metadata esperada desde BTCPay PoS

```json
{
  "event": "pump_it_up",
  "user": "maxi_sats",
  "comment": "¡A tope de power!"
}
```

---

## 🎛 Eventos disponibles

| Evento           | Acción en OBS             |
|------------------|---------------------------|
| `descarga_lightning` | Activa LightningEffect (10s) |
| `tts_comment`    | Reproduce voz TTS         |
| `custom_tip`     | Reproduce voz TTS         |
| `michael_saylor` | Activa SaylorMeme (10s)   |
| `pump_it_up`     | Activa PumpItUpMedia (45s)|
| `proof_of_work`  | Activa PoWOverlay (15s)   |

---

## 🧪 Desarrollo manual

```bash
cd backend && npm install && node index.js
cd ../frontend && npm install && npm start
```

---

## 🧠 Contribuye

Pull requests bienvenidos. Abre un issue para sugerencias.

## 📄 Licencia

MIT © Man De Bitcoin