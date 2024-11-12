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
    console.log(req.token);
    console.log("This is the secret", config.SECRET);
    // Verify token matches
    const decodedToken = jwt.verify(req.token, config.SECRET);

    console.log("This is the decoded token", decodedToken);
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);
    console.log("This is decodedTokenid: ", decodedToken.id);
    //Call assemblyAI to transcribe the video
    // const { audio_url, id } = await transcribeVideo(link);

    const audio_url = "test_audio_url";
    const id = "test_audio_url";

    console.log(user);
    // Rename AssemblyAI id
    const newTranscript = new Transcript({
        url: audio_url,
        AssemblyAI_id: id,
        name: name,
        notes: "",
        user: user._id,
    });

    const savedTranscript = await newTranscript.save();
    console.log("This is saved transcript", savedTranscript);
    // Update users
    user.transcripts = user.transcripts.concat(savedTranscript._id);
    await user.save();

    res.status(200).json(savedTranscript);
});

module.exports = transcriptRouter;
