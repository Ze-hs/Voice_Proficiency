const Transcript = require("./models/transcripts");
const mongoose = require("mongoose");
const User = require("./models/users");

const config = require("./utils/config");

mongoose.connect(config.MONGODB_URI);

const find_transcripts = async (id) => {
    const test = await Transcript.find({ user: id });
    console.log(test);
};

find_transcripts("67340694c9f6bce69028f7eb");
