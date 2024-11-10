import { createSlice } from "@reduxjs/toolkit";

const transcriptSlice = createSlice({
    name: "currentTranscript",
    initialState: null,
    reducers: {
        setCurrentTranscript(state, action) {
            return action.payload;
        },
    },
});

export default transcriptSlice.reducer;
export const { setCurrentTranscript } = transcriptSlice.actions;
