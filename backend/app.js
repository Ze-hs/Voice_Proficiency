// Library Imports
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Router Imports
const transcriptRouter = require("./controllers/transcripts");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

// Misc Imports
const middleware = require("./utils/middleware");
const config = require("./utils/config");

mongoose.connect(config.MONGODB_URI);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(middleware.getAuthToken);

// Use Routers
app.use("/api/login", loginRouter);
app.use("/api/transcripts", transcriptRouter);
app.use("/api/users", userRouter);

// app.use(middleware.errorHandling);
app.use(middleware.unknownEndPoint);

module.exports = app;
