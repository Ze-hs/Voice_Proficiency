const logger = require("./utils");

const errorHandling = (error, request, response, next) => {
    logger.error(error.name, error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "Malformatted ID" });
    } else if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message });
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: "token invalid" });
    } else if (
        error.name === "MongoServerError" &&
        error.message.includes("E11000 duplicate key error")
    ) {
        return response
            .status(400)
            .send({ error: "expected username to be unique" });
    }

    return response.status(400).send({ error: "Unknown Error" });
};

const unknownEndPoint = (error, request, response, next) => {
    response.status(404).send({ error: "Unknown Endpoint" });
};

const getAuthToken = (request, response, next) => {
    const authorization = request.get("Authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        request.token = authorization.replace("Bearer ", "");
    }

    next();
};

module.exports = {
    unknownEndPoint,
    errorHandling,
    getAuthToken,
};
