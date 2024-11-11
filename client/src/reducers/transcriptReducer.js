import { createSlice } from "@reduxjs/toolkit";
import transcriptService from "../services/transcript";

const transcriptSlice = createSlice({
    name: "currentTranscript",
    initialState: null,
    reducers: {
        setCurrentTranscript(state, action) {
            return action.payload;
        },
    },
});

export const getTranscript = (id) => {
    return async (dispatch) => {
        const data = await transcriptService.get(id);
        dispatch(setCurrentTranscript(data));
    };
};

export default transcriptSlice.reducer;
export const { setCurrentTranscript } = transcriptSlice.actions;
