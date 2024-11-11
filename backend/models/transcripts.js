const mongoose = require('mongoose')

const transcriptSchema = new mongoose.Schema({
    name: { type: String, required: true},
    url: {type: String, required: true},
    notes: {type: String},
    AssemblyAI_id: {type: String, required: true}
})

transcriptSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Transcript', transcriptSchema)