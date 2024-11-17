import { createSlice } from "@reduxjs/toolkit";

const notificationSlicer = createSlice({
    name: "notification",
    initialState: [],
    reducers: {
        // success
        // info
        // warning
        // error
        addNotification(state, action) {
            state.push(action.payload);
        },

        removeNotification(state, action) {
            state.shift();
        },
    },
});

export default notificationSlicer.reducer;
export const { addNotification, removeNotification } =
    notificationSlicer.actions;
