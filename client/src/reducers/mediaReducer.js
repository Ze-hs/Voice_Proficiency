import { createSlice } from "@reduxjs/toolkit";
import mediaService from "../services/media";
import { setTranscript } from "./transcriptReducer";

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
    console.log(media);
    const response = mediaService.add(media);
    return async (dispatch) => {
        dispatch(setMedia(response.data));
        dispatch(setTranscript(response.data));
    };
};
