import { AssemblyAI } from 'assemblyai'
import config from '../utils/config'
import utils from '../utils/utils'
const client = new AssemblyAI({
  apiKey: config.ASSEMBLY_AI_KEY
})

const transcribeVideo = async (path) => {
  const audioFile = path
  const transcript = await client.transcripts.transcribe({Audio: audioFile})

  if (transcript.status === 'error') {
    utils.error(`Transcription failed: ${transcript.error}`)
    throw new Error('Transcription Failed')
  }

  return transcript
}

module.exports = transcribeVideo