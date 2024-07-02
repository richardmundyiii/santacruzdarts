import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  details: "",
  date: new Date(),
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
  },
});

export const { addEvent } = eventSlice.actions;
export default eventSlice.reducer;
