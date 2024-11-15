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

    // const transcript = "Worked"
    if (transcript.status === "error") {
        utils.error(`Transcription failed: ${transcript.error}`);
        throw new Error("Transcription Failed");
    }

    return transcript;
};

const getTranscript = async (id) => {
    const transcript = await client.transcripts.get(id);
    return transcript;
};

module.exports = { transcribeVideo, getTranscript };
