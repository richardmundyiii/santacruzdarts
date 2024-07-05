// src/features/eventSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../utilities/events-api";

const initialState = {
  events: [],
  status: "idle",
  error: null,
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await getAllEvents();
  return response.map((event) => ({
    ...event,
    date: new Date(event.date),
    title: event.title || "",
    details: event.details || "",
  }));
});

export const updateEventById = createAsyncThunk(
  "events/updateEventById",
  async (event) => {
    const updatedEvent = await updateEvent(event._id, event);
    return updatedEvent;
  }
);

export const deleteEventById = createAsyncThunk(
  "events/deleteEventById",
  async (eventId) => {
    await deleteEvent(eventId);
    return eventId;
  }
);

export const createEvt = createAsyncThunk(
  "events/createEvent",
  async (eventData) => {
    const response = await createEvent(eventData);
    return response.data;
  }
);

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
      .addCase(deleteEventById.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event._id !== action.payload
        );
      })
      .addCase(updateEventById.fulfilled, (state, action) => {
        const updatedEvent = action.payload;
        const index = state.events.findIndex(
          (event) => event._id === updatedEvent._id
        );
        if (index !== -1) {
          state.events[index] = updatedEvent;
        }
      })
      .addCase(createEvt.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEvt.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events.push(action.payload);
      })
      .addCase(createEvt.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
