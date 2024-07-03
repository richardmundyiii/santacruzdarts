// src/features/events/eventSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllEvents,
  createEvents,
  updateEvent,
  deleteEvent,
} from "../utilities/events-api"; // Correct path

// Define initial state
const initialState = {
  events: [],
  status: "idle",
  error: null,
};

// Thunks for async actions
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await getAllEvents();
  return response;
});

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (newEvent) => {
    const response = await createEvents(newEvent);
    return response;
  }
);

export const updateEventThunk = createAsyncThunk(
  "events/updateEvent",
  async ({ id, updatedEvent }) => {
    const response = await updateEvent(id, updatedEvent);
    return response;
  }
);

export const deleteEventThunk = createAsyncThunk(
  "events/deleteEvent",
  async (id) => {
    await deleteEvent(id);
    return id;
  }
);

// Create the slice
const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEventThunk.fulfilled, (state, action) => {
        const index = state.events.findIndex(
          (event) => event._id === action.payload._id
        );
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(deleteEventThunk.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event._id !== action.payload
        );
      });
  },
});

export default eventSlice.reducer;
