import axios from "axios";

const baseUrl = "http://localhost:3000/api/transcripts";

const getAll = async () => {
    const data = await axios.get(baseUrl);
    console.log(data);
};

//Expects a file
const add = async (media) => {
    const response = await axios.post(baseUrl, media);
    return response.data;
};

export default { add, getAll };
