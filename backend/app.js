const express = require('express')
const cors = require('cors')
const transcriptRouter = require('./controllers/transcripts')

const app = express()
// Read req body
app.use(cors())
app.use(express.json())



app.use('/api/transcripts', transcriptRouter)

module.exports = app