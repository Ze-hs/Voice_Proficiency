import axios from "axios";

const baseUrl = "http://localhost:3000/transcripts";

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

//Expects a file
const add = async (media) => {
    const response = await axios.post(baseUrl, media);
    return response.data;
};

export default { add, getAll };
