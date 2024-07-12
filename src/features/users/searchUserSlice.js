import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: "",
  errorMsg: null,
  loading: "Submit",
  attempts: 3,
};

export const fetchUser = createAsyncThunk(
  "searchUser/fetchUser",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);

const searchUserSlice = createSlice({
  name: "searchUser",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    resetErrorMsg: (state) => {
      state.errorMsg = null;
    },
    decrementAttempts: (state) => {
      state.attempts -= 1;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = "Loading...";
      })
      .addCase(fetchUser.fulfilled, (state) => {
        state.loading = "Submit";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = "Submit";
        state.attempts -= 1;
        state.errorMsg = `User Does Not Exist! ${state.attempts} Attempts remaining`;
      });
  },
});

export const {
  setUsername,
  resetErrorMsg,
  decrementAttempts,
  setLoading,
  setErrorMsg,
} = searchUserSlice.actions;
export default searchUserSlice.reducer;
