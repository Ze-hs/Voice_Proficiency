import { createSlice } from "@reduxjs/toolkit";
import transcriptService from "../services/transcript";
import { addTranscript } from "./transcriptListReducer";

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
    return async (dispatch) => {
        console.log(media.link);
        const response = await transcriptService.add(media);
        console.log(response);

        const newMediaObj = {
            name: media.name,
            ...response,
        };

        console.log(newMediaObj);
        dispatch(setMedia(response.url));
        dispatch(addTranscript(newMediaObj));
        // dispatch(setTranscript(data.words));
    };
};
