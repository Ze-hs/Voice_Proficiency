const { AssemblyAI } = require("assemblyai");
const config = require("../utils/config");
const utils = require("../utils/utils");

const client = new AssemblyAI({
    apiKey: config.ASSEMBLY_AI_KEY,
});

const transcribeVideo = async (path) => {
    const params = {
        audio: path,
        speaker_labels: true,
    };

    const transcript = await client.transcripts.transcribe(params);

    if (transcript.status === "error") {
        utils.error(`Transcription failed: ${transcript.error}`);
        throw new Error("Transcription Failed");
    }

    return transcript;
};

const getTranscript = async (id) => {
    const transcript = await client.transcripts.get(id);

    const newTranscript = {
        audio_url: transcript.audio_url,
        id: transcript.id,
        words: transcript.words,
    };

    return newTranscript;
};

module.exports = { transcribeVideo, getTranscript };
