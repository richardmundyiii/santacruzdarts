import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  post: "",
  isSticky: false,
  date: new Date(),
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    addArticle: (state, action) => {
      state.events.push(action.payload);
    },
  },
});

export const { addArticle } = articleSlice.actions;
export default articleSlice.reducer;
