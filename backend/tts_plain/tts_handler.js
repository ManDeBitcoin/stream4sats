
const fs = require('fs');
const path = require('path');
const gTTS = require('gtts');
const { getAudioDurationInSeconds } = require('get-audio-duration');

async function handleTTS(user, comment, obs, sceneName = 'StreamingScene') {
    if (!comment) return;

    const baseDir = __dirname;
    const textFilePath = path.join(baseDir, 'tts.txt');
    const audioFilePath = path.join(baseDir, 'audio', 'tts.mp3');
    const text = `${user}: ${comment}`;

    fs.writeFileSync(textFilePath, text);

    const gtts = new gTTS(text, 'es');
    gtts.save(audioFilePath, async function (err) {
        if (err) {
            console.error('❌ Error al generar TTS:', err);
        } else {
            console.log('✅ TTS generado:', audioFilePath);

            try {
                const { sceneItems } = await obs.call('GetSceneItemList', { sceneName });
                const audioItem = sceneItems.find(i => i.sourceName === 'TTSAudio');
                const textItem = sceneItems.find(i => i.sourceName === 'TTSCommentText');

                if (audioItem) {
                    await obs.call('SetSceneItemEnabled', {
                        sceneName,
                        sceneItemId: audioItem.sceneItemId,
                        sceneItemEnabled: true
                    });
                    console.log('🔊 TTSAudio ACTIVADA');
                }

                if (textItem) {
                    await obs.call('SetSceneItemEnabled', {
                        sceneName,
                        sceneItemId: textItem.sceneItemId,
                        sceneItemEnabled: true
                    });
                    console.log('💬 TTSCommentText ACTIVADA');
                }

                const duration = await getAudioDurationInSeconds(audioFilePath);
                const delayMs = Math.max(duration * 1000, 8000) + 200;

                setTimeout(async () => {
                    if (audioItem) {
                        await obs.call('SetSceneItemEnabled', {
                            sceneName,
                            sceneItemId: audioItem.sceneItemId,
                            sceneItemEnabled: false
                        });
                        console.log('🔇 TTSAudio DESACTIVADA');
                    }

                    if (textItem) {
                        await obs.call('SetSceneItemEnabled', {
                            sceneName,
                            sceneItemId: textItem.sceneItemId,
                            sceneItemEnabled: false
                        });
                        console.log('🛑 TTSCommentText DESACTIVADA');
                    }

                    fs.writeFileSync(textFilePath, '');
                    console.log('🧽 Texto limpiado de tts.txt');

                }, delayMs);
            } catch (err) {
                console.error('❌ Error OBS al manejar fuentes TTS:', err);
            }
        }
    });
}

module.exports = { handleTTS };
