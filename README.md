<<<<<<< HEAD
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
=======
# stream4sats

Proyecto inicial de **stream4sats**.  
Incluye un backend con Express y WebSocket, y un frontend React con un panel de configuración básico.  
Pensado para integrarse con **BTCPay Server**, **OBS Studio** y donaciones a través de **Lightning Network**.

---

## 🚀 Funcionalidades

- Backend Express para recibir pagos Lightning y enviar eventos por WebSocket.
- Frontend React con panel inicial de configuración.
- Comunicación local entre BTCPay Server y OBS Studio.
- Soporte para metadata personalizada: `event`, `user`, `comment`.
- Base modular para futuras expansiones (videos, sonidos, efectos personalizados).

---

## 🛠️ Estructura del Proyecto

```
stream4sats/
├── backend/         # Servidor Express
├── frontend/        # Interfaz en React
├── .env.example     # Variables de entorno de ejemplo
└── README.md
>>>>>>> 6987af0a27ffbb96bdfb28a6ea9a0c5f29858eca
```

---

<<<<<<< HEAD
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
=======
## 👤 Autor

Desarrollado por **Man De Bitcoin**  
💡 Educador, creador de contenido y promotor de Bitcoin en Latinoamérica.

Si deseas apoyar este proyecto, puedes hacerlo con una donación a través de Lightning:  
⚡ **mandebitcoin@getalby.com**

¡Gracias por apoyar el desarrollo libre y abierto con Bitcoin! ⚡# stream4sats
>>>>>>> 6987af0a27ffbb96bdfb28a6ea9a0c5f29858eca
