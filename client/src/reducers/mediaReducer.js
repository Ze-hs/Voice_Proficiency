import { createSlice } from "@reduxjs/toolkit";
import transcript from "../services/transcript";
import { setAllTranscript, addTranscript } from "./transcriptListReducer";

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

// Media should have a link and name
export const uploadMedia = (media) => {
    const { data } = transcript.add(media.link);

    const newMediaObj = {
        name: media.name,
        ...data,
    };

    return async (dispatch) => {
        dispatch(setMedia(data.audio_url));
        dispatch(addTranscript(newMediaObj));
        // dispatch(setTranscript(data.words));
    };
};
