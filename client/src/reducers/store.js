import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "./mediaReducer";
import transcriptReducer from "./transcriptReducer";

const store = configureStore({
    reducer: {
        //URL
        media: mediaReducer,
        transcripts: transcriptReducer,
    },
});

export default store;
