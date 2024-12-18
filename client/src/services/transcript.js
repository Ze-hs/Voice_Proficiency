import axios from "axios";

const baseUrl = "/api/transcripts";
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
    const config = {
        headers: {
            authorization: token,
        },
    };

    const response = await axios.post(baseUrl, media, config);
    return response.data;
};

const update = async (data) => {
    const config = {
        headers: {
            authorization: token,
        },
    };
    const response = await axios.put(baseUrl, data, config);
    return response.data;
};

export default { add, getAll, update, get, setToken, getFromUser };
