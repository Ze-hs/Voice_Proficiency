import { createSlice } from "@reduxjs/toolkit";

const mediaSlice = createSlice({
    name: "media",
    initialState: null,
    reducers: {
        setMedia(state, action) {
            return action.payload;
        },
    },
});

export default mediaReducer;
export const { setMedia } = mediaSlice.actions;
