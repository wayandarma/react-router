import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk to fetch GitHub user data
export const fetchGitUser = createAsyncThunk(
  "gitUser/fetchGitUser",
  async (username) => {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    console.log(response.data);
    return response.data;
  }
);

const gitUserSlice = createSlice({
  name: "gitUser",
  initialState: {
    data: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGitUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGitUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchGitUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default gitUserSlice.reducer;
