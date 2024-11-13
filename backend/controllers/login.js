const loginRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const config = require("../utils/config");

loginRouter.post("/", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate("transcripts");

    // Check if password matches
    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash);

    // If it can user or password not correct return error
    if (!(user && passwordCorrect)) {
        return res.status(404).json({ error: "Invalid username or password " });
    }

    // Set up token
    const useForToken = {
        username: user.username,
        id: user.id,
    };

    const token = jwt.sign(useForToken, config.SECRET, { expiresIn: 60 * 60 });

    res.status(200).json({
        token,
        username: user.username,
        name: user.name,
        id: user.id,
    });
});

module.exports = loginRouter;
