require("dotenv").config();

const PORT = process.env.PORT;
const ASSEMBLY_AI_KEY = process.env.ASSEMBLY_AI_KEY;
const MONGODB_URI =
    process.env.NODE_ENV === "test"
        ? process.env.TEST_MONGODB_URI
        : process.env.MONGODB_URI;
const SECRET = process.env.SECRET;

module.exports = {
    PORT,
    ASSEMBLY_AI_KEY,
    MONGODB_URI,
    SECRET,
};
