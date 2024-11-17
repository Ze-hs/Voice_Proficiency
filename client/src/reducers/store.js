import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "./mediaReducer";
import transcriptListReducer from "./transcriptListReducer";
import transcriptReducer from "./transcriptReducer";
import userReducer from "./userReducer";
import notificationReducer from "./notificationReducer";

const store = configureStore({
    reducer: {
        //URL
        media: mediaReducer,
        transcripts: transcriptListReducer,
        currentTranscript: transcriptReducer,
        user: userReducer,
        notification: notificationReducer,
    },
});

export default store;
