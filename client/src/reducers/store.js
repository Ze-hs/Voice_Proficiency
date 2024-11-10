import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "./mediaReducer";

const store = configureStore({
    reducer: {
        media: mediaReducer,
    },
});

export default store;
