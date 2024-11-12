const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required:true, unique: true},
    name: String,
    passwordHash: String,
    transcripts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transcript'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // Delete hash as well
        delete returnedObject.passwordHash
    }
})

module.exports = new mongoose.model('User', userSchema)