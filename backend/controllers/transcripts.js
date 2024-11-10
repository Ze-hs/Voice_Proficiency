const transcriptRouter = require('express').Router()
const {transcribeVideo} = require('../services/assemblyAI')

transcriptRouter.get('/', (req, res) => {
    res.send('Hello from transcripts')
})

transcriptRouter.post('/', async (req, res) => {
    console.log("Coming from the backend post")
    const body = req.body
    console.log(body.link)
    const data = await transcribeVideo(body.link)
    res.json(data)
})

module.exports = transcriptRouter