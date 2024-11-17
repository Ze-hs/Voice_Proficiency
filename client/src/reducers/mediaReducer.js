import { createSlice } from "@reduxjs/toolkit";
import transcriptService from "../services/transcript";
import { addTranscript } from "./transcriptListReducer";
import { addNotification } from "./notificationReducer";

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
        try {
            const response = await transcriptService.add(media);

            const newMediaObj = {
                name: media.name,
                ...response,
            };

            dispatch(setMedia(response.url));
            dispatch(addTranscript(newMediaObj));
            dispatch(
                addNotification({
                    message: "Upload Successful",
                    type: "success",
                })
            );
        } catch (error) {
            dispatch(
                addNotification({
                    message: "Upload Failed, Please Enter a Valid Link",
                    type: "error",
                })
            );
        }
    };
};
