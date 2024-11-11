import { createSlice } from "@reduxjs/toolkit";
import transcript from "../services/transcript";
import { setAllTranscript } from "./transcriptListReducer";

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
    const { data } = transcript.add(media);

    return async (dispatch) => {
        dispatch(setMedia(data.audio_url));
        // dispatch(setTranscript(data.words));
    };
};
