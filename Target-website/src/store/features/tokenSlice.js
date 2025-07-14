import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const { saveToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
