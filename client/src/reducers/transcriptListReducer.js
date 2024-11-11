// Only used to get all of the saved data, will be replaced with RTK query

import { createSlice } from "@reduxjs/toolkit";
import transcriptService from "../services/transcript";

const transcriptListSlice = createSlice({
    name: "transcripts",
    initialState: [],
    reducers: {
        setAllTranscript(state, action) {
            return action.payload;
        },

        addTranscript(state, action) {
            state.push(action.payload);
        },
    },
});

export default transcriptListSlice.reducer;
export const { setAllTranscript, addTranscript } = transcriptListSlice.actions;

export const initializeTranscripts = () => {
    return async (dispatch) => {
        const data = await transcriptService.getAll();
        console.log(data);
        dispatch(setAllTranscript(data));
    };
};
