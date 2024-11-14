import { createSlice } from "@reduxjs/toolkit";
import transcriptService from "../services/transcript";

import { convertToSec } from "../utils/helper";

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

        // If too slow, move this to the backend
        data.words = data.words.map(({ text, start, end }) => {
            const startSec = convertToSec(start);
            const endSec = convertToSec(end);
            return { text, start: startSec, end: endSec };
        });
        dispatch(setCurrentTranscript(data));
    };
};

export default transcriptSlice.reducer;
export const { setCurrentTranscript } = transcriptSlice.actions;
