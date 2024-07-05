import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import eventReducer from "./features/eventSlice";

export const store = configureStore({
  reducer: {
    events: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["events/fetchEvents/fulfilled"],
        ignoredPaths: ["events.events.date"],
      },
    }),
});
