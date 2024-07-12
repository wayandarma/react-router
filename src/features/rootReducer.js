import { combineReducers } from "@reduxjs/toolkit";
import gitUserReducer from "./users/gitUserSlice";
import gitReposReducer from "./repos/gitReposSlice";
import authReducer from "./auth/authSlice";
import searchUserReducer from "./users/searchUserSlice";
const rootReducer = combineReducers({
  gitUser: gitUserReducer,
  gitRepos: gitReposReducer,
  auth: authReducer,
  searchUser: searchUserReducer,
});

export default rootReducer;
