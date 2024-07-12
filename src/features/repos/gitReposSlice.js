import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const fetchGitRepos = createAsyncThunk("gitRepos/fetchGitRepos", async () => {
  const response = await axios.get(
    "https://api.github.com/search/repositories?q=XXX"
  );
  return response.data.items;
});

const fetchRepoDetails = createAsyncThunk(
  "gitRepos/fetchRepoDetails",
  async ({ username, name }) => {
    const response = await axios.get(
      `https://api.github.com/repos/${username}/${name}`
    );
    return response.data;
  }
);

const gitReposSlice = createSlice({
  name: "gitRepos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGitRepos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGitRepos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchGitRepos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchRepoDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRepoDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchRepoDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default gitReposSlice.reducer;
export { fetchGitRepos, fetchRepoDetails };
