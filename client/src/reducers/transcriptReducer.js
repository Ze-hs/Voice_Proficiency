import { createSlice } from "@reduxjs/toolkit";

const transcriptSlice = {
    name: "transcript",
    initialState: [],
    reducers: {
        setTranscript(state, action) {
            return action.payload;
        },
    },
};

export default transcriptSlice.reducer;
export const { setTranscript } = transcriptSlice.actions;
