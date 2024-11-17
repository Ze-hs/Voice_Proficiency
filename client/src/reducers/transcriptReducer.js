import { createSlice } from "@reduxjs/toolkit";
import transcriptService from "../services/transcript";
import { setAllTranscript } from "./transcriptListReducer";
import { convertToSec } from "../utils/helper";
import { addNotification } from "./notificationReducer";

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
        const { id, body_notes, voice_notes, notes, name } = transcript;
        const response = await transcriptService.get(id);
        const data = { ...response, name, body_notes, voice_notes, notes };

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

        try {
            await transcriptService.update(newTranscript);
            const state = getState().transcripts;

            const newState = state.map((transcript) =>
                transcript.id == currTranscript.id
                    ? { ...transcript, name }
                    : transcript
            );
            dispatch(setAllTranscript(newState));
            dispatch(setCurrentTranscript(newTranscript));
            dispatch(
                addNotification({
                    message: "Note Saved",
                    type: "success",
                })
            );
        } catch (error) {
            dispatch(
                addNotification({
                    message: "Failed To Save Notes. Try Again Later!",
                    type: "error",
                })
            );
        }
    };
};

export default transcriptSlice.reducer;
export const { setCurrentTranscript } = transcriptSlice.actions;
