import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  isLogged: false,
  errorMsg: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      if (username === "wayandarma" && password === "03032003") {
        state.username = username;
        state.isLogged = true;
        state.errorMsg = "";
      } else {
        state.errorMsg = "Incorrect username or password";
      }
    },
    logout: (state) => {
      state.username = "";
      state.password = "";
      state.isLogged = false;
      state.errorMsg = "";
    },
  },
});

export const {
  setUsername,
  setPassword,
  setIsLogged,
  setErrorMsg,
  login,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
