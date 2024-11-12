import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "./mediaReducer";
import transcriptListReducer from "./transcriptListReducer";
import transcriptReducer from "./transcriptReducer";
import userReducer from "./userReducer";

const store = configureStore({
    reducer: {
        //URL
        media: mediaReducer,
        transcripts: transcriptListReducer,
        currentTranscript: transcriptReducer,
        user: userReducer,
    },
});

export default store;
