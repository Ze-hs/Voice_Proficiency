require('dotenv').config()

const PORT = process.env.PORT
const ASSEMBLY_AI_KEY = process.env.ASSEMBLY_AI_KEY
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
    PORT,
    ASSEMBLY_AI_KEY,
    MONGODB_URI
}