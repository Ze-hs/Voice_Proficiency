import axios from "axios";

const baseUrl = "http://localhost:3000/api/transcripts";
let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const getFromUser = async (id) => {
    const response = await axios.get(`${baseUrl}/user/${id}`);
    return response.data;
};

const get = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
};

//Expects an object with 2 attributes:
// 1. Media url: String
// 2. Media name: String
const add = async (media) => {
    console.log("token from add", token);
    const config = {
        headers: {
            authorization: token,
        },
    };
    const response = await axios.post(baseUrl, media, config);
    return response.data;
};

export default { add, getAll, get, setToken, getFromUser };
