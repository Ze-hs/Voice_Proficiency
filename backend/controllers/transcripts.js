const transcriptRouter = require('express').Router()

transcriptRouter.get('/', (req, res) => {
    res.send('Hello from transcripts')
})

transcriptRouter.post('/', (req, res) => {
    console.log(req.body)
    res.json({name:"good work"})
})

module.exports = transcriptRouterz