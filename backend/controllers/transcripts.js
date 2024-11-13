const transcriptRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const Transcript = require("../models/transcripts");
const User = require("../models/users");
const config = require("../utils/config");
const { transcribeVideo, getTranscript } = require("../services/assemblyAI");

transcriptRouter.get("/", async (req, res) => {
    const result = await Transcript.find({}).populate("user");
    res.json(result);
});

transcriptRouter.get("/user/:id", async (req, res) => {
    const userId = req.params.id;
    const result = await Transcript.find({ user: userId });
    res.json(result);
});

transcriptRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await Transcript.findById(id);
    const transcript = await getTranscript(response.AssemblyAI_id);

    // Replace AssemblyAI id
    // Might need to make a helper function for this
    const newTranscript = {
        url: transcript.audio_url,
        AssemblyAI_id: transcript.id,
        id: response.id,
        ...transcript,
    };

    res.json(newTranscript);
});

transcriptRouter.post("/", async (req, res) => {
    const { name, link } = req.body;
    // Verify token matches
    if (!req.token) {
        return res.status(401).json({ error: "invalid webJSONtoken" });
    }
    const decodedToken = jwt.verify(req.token, config.SECRET);

    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);
    //Call assemblyAI to transcribe the video
    const { audio_url, id } = await transcribeVideo(link);

    // Rename AssemblyAI id
    const newTranscript = new Transcript({
        url: audio_url,
        AssemblyAI_id: id,
        name: name,
        notes: "",
        user: user._id,
    });

    const savedTranscript = await newTranscript.save();
    // Update users
    user.transcripts = user.transcripts.concat(savedTranscript._id);
    await user.save();

    res.status(200).json(savedTranscript);
});

module.exports = transcriptRouter;
