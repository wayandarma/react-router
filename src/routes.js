import { lazy } from "react";

import Home from "./components/home";
const Users = lazy(() => import("./components/users"));
const UserProfile = lazy(() => import("./components/userProfile"));
const SearchUser = lazy(() => import("./components/searchUser"));
const Login = lazy(() => import("./components/login"));
const AuthProfile = lazy(() => import("./components/authProfile"));
const NotFound = lazy(() => import("./components/notfound"));
const AboutUs = lazy(() => import("./components/about"));

export const appRoutes = [
  {
    path: "/",
    requestAuth: false,
    component: Home,
  },
  {
    path: "/about",
    requestAuth: false,
    component: AboutUs,
  },
  {
    path: "/users",
    requestAuth: false,
    component: Users,
  },
  {
    path: "/users/user/:username",
    requestAuth: false,
    component: UserProfile,
  },
  {
    path: "/search",
    requestAuth: false,
    component: SearchUser,
  },
  {
    path: "/login",
    requestAuth: false,
    component: Login,
  },
  {
    path: "/authProfile",
    requestAuth: true,
    component: AuthProfile,
  },
  {
    path: "*",
    requestAuth: false,
    component: NotFound,
  },
];
