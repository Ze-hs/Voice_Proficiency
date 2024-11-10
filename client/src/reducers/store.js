import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "./mediaReducer";
import transcriptListReducer from "./transcriptListReducer";
import transcriptReducer from "./transcriptReducer";
const store = configureStore({
    reducer: {
        //URL
        media: mediaReducer,
        transcripts: transcriptListReducer,
        currentTranscript: transcriptReducer,
    },
});

export default store;
