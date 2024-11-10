import { createSlice } from "@reduxjs/toolkit";
import transcriptService from "../services/transcript";

const transcriptSlice = createSlice({
    name: "transcripts",
    initialState: [],
    reducers: {
        setAllTranscript(state, action) {
            return action.payload;
        },
    },
});

export default transcriptSlice.reducer;
export const { setAllTranscript } = transcriptSlice.actions;

export const initializeTranscripts = () => {
    return async (dispatch) => {
        const data = await transcriptService.getAll();
        dispatch(setAllTranscript(data));
        // setAllTranscript();
    };
};
