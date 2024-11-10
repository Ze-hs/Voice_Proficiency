require('dotenv').config()

const PORT = process.env.PORT
const ASSEMBLY_AI_KEY = process.env.ASSEMBLY_AI_KEY

module.exports = {
    PORT,
    ASSEMBLY_AI_KEY
}