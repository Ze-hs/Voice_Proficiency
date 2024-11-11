// Library Imports
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// Router Imports
const transcriptRouter = require('./controllers/transcripts')

// Misc Imports
const config = require('./utils/config')

mongoose.connect(config.MONGODB_URI)

// Middlewares
app.use(cors())
app.use(express.json())


// Use Routers
app.use('/api/transcripts', transcriptRouter)

module.exports = app