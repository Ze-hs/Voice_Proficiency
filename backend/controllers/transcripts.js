const transcriptRouter = require('express').Router()
const Transcript = require('../models/transcripts')
const {transcribeVideo, getTranscript} = require('../services/assemblyAI')

transcriptRouter.get('/', async (req, res) => {
    const result = await Transcript.find({})
    res.json(result)
})

transcriptRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const response = await Transcript.findById(id)
    const transcript = await getTranscript(response.AssemblyAI_id)

    // Replace AssemblyAI id 
    // Might need to make a helper function for this
    const newTranscript = {
        url: transcript.audio_url,
        AssemblyAI_id: transcript.id,
        id: response.id,
        ...transcript
    }
    res.json(newTranscript)
})

transcriptRouter.post('/', async (req, res) => {
    const {name, link} = req.body
    //Call assemblyAI to transcribe the video
    const {audio_url, id} = await transcribeVideo(link)
    console.log(id)
    // Rename AssemblyAI id 
    const newTranscript = new Transcript({
        url: audio_url,
        AssemblyAI_id: id,
        name: name,
        notes: ""
    })
    //

    const result = await newTranscript.save() 
    res.status(200).json(result)
})

module.exports = transcriptRouter