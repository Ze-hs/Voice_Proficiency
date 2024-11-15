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

export const getTranscript = (transcript) => {
    return async (dispatch) => {
        const { id, body_notes, voice_notes, notes } = transcript;
        const response = await transcriptService.get(id);
        const data = { ...response, body_notes, voice_notes, notes };

        // If too slow, move this to the backend
        data.words = data.words.map(({ text, start, end }) => {
            const startSec = convertToSec(start);
            const endSec = convertToSec(end);
            return {
                text,
                start: startSec,
                end: endSec,
            };
        });

        dispatch(setCurrentTranscript(data));
    };
};

export const updateTranscript = (type, name, notes) => {
    return async (dispatch, getState) => {
        const currTranscript = getState().currentTranscript;
        const newTranscript = {
            ...currTranscript,
            name,
            ...(type === "body" && { body_notes: notes }),
            ...(type === "voice" && { voice_notes: notes }),
            ...(type !== "body" && type !== "voice" && { notes }),
        };

        await transcriptService.update(newTranscript);
    };
};

export default transcriptSlice.reducer;
export const { setCurrentTranscript } = transcriptSlice.actions;
