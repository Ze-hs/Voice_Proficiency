const transcriptRouter = require('express').Router()
const assemblyService = require('../services/assemblyAI')

transcriptRouter.get('/', (req, res) => {
    res.send('Hello from transcripts')
})

transcriptRouter.post('/', async (req, res) => {
    console.log("Coming from the backend post")
    const body = req.body
    const path = body.path
    // const data = wait assemblyService()
    console.log(path)
    res.json(req.body)
})

module.exports = transcriptRouter