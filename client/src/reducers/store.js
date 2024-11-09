import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "./mediaReducer";

const store = configureStore({
    media: mediaReducer,
});

export default store;
