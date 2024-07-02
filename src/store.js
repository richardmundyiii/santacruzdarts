import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./features/eventSlice";
import articleReducer from "./features/articleSlice";

export const store = configureStore({
  reducer: {
    event: eventReducer,
    article: articleReducer,
  },
});
