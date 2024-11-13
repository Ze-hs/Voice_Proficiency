const { test, after, beforeEach, describe } = require("node:test");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const assert = require("node:assert");
const User = require("../models/users");
const Transcript = require("../models/users");
const bcrypt = require("bcryptjs");
const helper = require("./user_api_helper");

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
    await Transcript.deleteMany({});
    // Create a new User

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", name: "name", passwordHash });

    // Save that User
    await user.save();
});

// describe("User API Test", () => {
//     test("Return correct number of users", async () => {
//         const response = await api.get("/api/users");
//         const body = response.body;
//         assert.strictEqual(body.length, 1);
//     });

//     test("Specific user is returned", async () => {
//         const userInfo = {
//             username: "Test1",
//             name: "Name1",
//             password: "Password1",
//         };

//         const response = await api.post("/api/users").send(userInfo);
//         const { id } = response.body;

//         // Get newly created user from DB
//         const userResponse = await api.get(`/api/users/${id}`);

//         const returnedUser = userResponse.body;
//         assert(returnedUser.username.includes(userInfo.username));
//     });

//     test("Can add a user", async () => {
//         const usersAtStart = await helper.usersInDB();

//         const userInfo = {
//             username: "Test1",
//             name: "Name1",
//             password: "Password1",
//         };

//         await api.post("/api/users").send(userInfo).expect(201);
//         const usersAtEnd = await helper.usersInDB();

//         assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length);

//         const usernames = usersAtEnd.map((user) => user.username);
//         assert(usernames.includes(userInfo.username));
//     });
// });

describe("Transcript API Test", () => {
    // test("Get all transcripts", async () => {

    // })

    // test("Get users transcripts", async () => {});

    test("Add a specific transcripts", async () => {
        const credentials = {
            username: "root",
            password: "sekret",
        };
        const loginResponse = await api.post("/api/login").send(credentials);

        const transcriptInfo = {
            name: "test",
            link: "dummy_link",
        };

        const transcriptResponse = await api
            .post("/api/transcripts")
            .send(transcriptInfo)
            .set("Authorization", `Bearer +${loginResponse.body.token.trim()}`);
    });
});

// describe("Login API Test", () => {
//     test("Login in", async () => {
//         const credentials = {
//             username: "root",
//             password: "sekret",
//         };
//         const response = await api.post("/api/login").send(credentials);
//         console.log(response.body);
//         assert.strictEqual(response.body.username, "root");
//     });

//     // test("Cannot log in with wrong credentials", () => {
//     //     test("Login in", async () => {
//     //         const credentials = {
//     //             username: "root",
//     //             password: "sekrets",
//     //         };
//     //         const response = await api.post("/api/login").send(credentials);
//     //         assert.strictEqual(response.body.username, undefined);
//     //     });
//     // });

//     test("Can add a transcript ", async () => {});
// });

after(async () => {
    await mongoose.connection.close();
});
