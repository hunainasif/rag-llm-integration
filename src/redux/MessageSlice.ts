import { createSlice } from "@reduxjs/toolkit";

export const MessageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessages: () => {},
  },
});
