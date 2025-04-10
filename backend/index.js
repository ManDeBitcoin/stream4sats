require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const OBSWebSocket = require('obs-websocket-js').default;
const { handleTTS } = require('./tts_plain/tts_handler');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

const PORT = process.env.PORT || 7777;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
const SCENE_NAME = process.env.SCENE_NAME || 'StreamingScene';

app.use(cors());

app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}));

const obs = new OBSWebSocket();
obs.connect('ws://localhost:4455', process.env.OBS_PASSWORD)
    .then(() => console.log('🎥 Conectado a OBS'))
    .catch(err => console.error('❌ Error al conectar con OBS', err));

async function getSceneItemId(sceneName, sourceName) {
    const { sceneItems } = await obs.call('GetSceneItemList', { sceneName });
    const item = sceneItems.find(i => i.sourceName === sourceName);
    return item ? item.sceneItemId : null;
}

function activarFuenteTemporal(sceneName, sourceName, duracionMs) {
    return new Promise(async (resolve, reject) => {
        try {
            const id = await getSceneItemId(sceneName, sourceName);
            if (!id) return reject(`❌ Fuente no encontrada: ${sourceName}`);

            await obs.call('SetSceneItemEnabled', {
                sceneName,
                sceneItemId: id,
                sceneItemEnabled: true
            });

            console.log(`✅ ${sourceName} ACTIVADO por ${duracionMs / 1000}s`);

            setTimeout(async () => {
                try {
                    await obs.call('SetSceneItemEnabled', {
                        sceneName,
                        sceneItemId: id,
                        sceneItemEnabled: false
                    });
                    console.log(`⏹️ ${sourceName} DESACTIVADO`);
                    resolve();
                } catch (err) {
                    console.error(`❌ Error al desactivar ${sourceName}`, err);
                    reject(err);
                }
            }, duracionMs);

        } catch (err) {
            console.error(`❌ Error en activarFuenteTemporal para ${sourceName}`, err);
            reject(err);
        }
    });
}

app.post('/btcpay-webhook', async (req, res) => {
    const signature = req.headers['btcpay-sig'];
    if (!signature) return res.status(400).send('Firma faltante');

    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    hmac.update(req.rawBody);
    const expectedSig = 'sha256=' + hmac.digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
        console.log('⚠️ Firma inválida');
        return res.status(400).send('Firma inválida');
    }

    const event = req.body;
    console.log('📩 WebHook verificado:', JSON.stringify(event, null, 2));

    if (event.type === 'InvoiceSettled') {
        const metadata = event.metadata || {};
        const user = metadata.user || 'Anónimo';
        const comment = metadata.comment || '';
        const lightningEvent = metadata.itemCode || metadata.event || 'custom_tip';
        const amount = metadata.invoice_amount || '0';

        console.log(`🎉 Pago recibido de ${user}: ${amount} sats - Evento: ${lightningEvent}`);

        try {
            // Guardar en SQLite
            const insert = db.prepare(`
        INSERT INTO zaps (amount, comment, user, event, timestamp)
        VALUES (?, ?, ?, ?, ?)
      `);
            insert.run(amount, comment, user, lightningEvent, new Date().toISOString());

            // Limpiar registros antiguos, conservar solo los 500 más recientes
            db.prepare(`
        DELETE FROM zaps WHERE id NOT IN (
          SELECT id FROM zaps ORDER BY timestamp DESC LIMIT 500
        )
      `).run();

            // Emitir a frontend
            io.emit("new_zap", {
                amount,
                comment,
                user,
                event: lightningEvent,
                timestamp: new Date().toISOString()
            });

            // Activar escenas o TTS
            const sceneName = SCENE_NAME;

            switch (lightningEvent) {
                case 'descarga_lightning':
                    await activarFuenteTemporal(sceneName, 'LightningEffect', 10000);
                    handleTTS(user, comment, obs);
                    break;

                case 'tts_comment':
                case 'custom_tip':
                    handleTTS(user, comment, obs);
                    break;

                case 'michael_saylor':
                    await activarFuenteTemporal(sceneName, 'SaylorMeme', 10000);
                    break;

                case 'pump_it_up':
                    await activarFuenteTemporal(sceneName, 'PumpItUpMedia', 45000);
                    break;

                case 'proof_of_work':
                    await activarFuenteTemporal(sceneName, 'PoWOverlay', 15000);
                    break;

                default:
                    console.log('📛 Evento no manejado:', lightningEvent);
                    break;
            }

        } catch (err) {
            console.error('⚠️ Error al manejar el evento:', err);
        }
    }

    res.sendStatus(200);
});

app.get('/api/zaps', (req, res) => {
    try {
        const zaps = db.prepare("SELECT * FROM zaps ORDER BY timestamp DESC LIMIT 100").all();
        res.json(zaps);
    } catch (err) {
        console.error("❌ Error al obtener zaps desde la base de datos:", err);
        res.status(500).json({ error: "Error al obtener los zaps" });
    }
});

server.listen(PORT, () => {
    console.log(`✅ stream4sats corriendo en http://localhost:${PORT}/btcpay-webhook`);
});