import { createSlice } from "@reduxjs/toolkit";
import util from "../utils/utils";
import mediaService from "../services/media";

const mediaSlice = createSlice({
    name: "media",
    initialState: null,
    reducers: {
        // Expects a id?, path, name
        setMedia(state, action) {
            return action.payload;
        },
    },
});

export default mediaSlice.reducer;
export const { setMedia } = mediaSlice.actions;

export const uploadMedia = (media) => {
    const jsonFile = util.fileToJson(media);
    console.log(`Coming from reducer, upload Media`, jsonFile);
    return async (dispatch) => {
        const data = await mediaService.set(jsonFile);
        dispatch(setMedia(data));
    };
};
