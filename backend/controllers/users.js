const userRouter = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");

userRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("transcripts");
    return res.json(users);
});

userRouter.post("/", async (req, res) => {
    console.log("I reachedb this endpoint");

    const { username, name, password } = req.body;

    const saltRound = 10;
    const passwordHash = await bcrypt.hash(password, saltRound);

    console.log("Do we have this");
    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();
    console.log("Do we have that");

    res.status(201).json(savedUser);
});

// userRouter.get("/:id", async (req, res) => {
//     const id = req.params.id;
//     const user = await User.findById(id);

//     return res.json(user);
// });

module.exports = userRouter;
