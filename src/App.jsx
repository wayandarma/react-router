// IMPROTANT IMPORT
import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useState, lazy } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";

// COMPONENT
import Home from "./components/home";

// ON DEMAND RENDER COMPONENT
const Users = lazy(() => import("./components/users"));
const UserProfile = lazy(() => import("./components/userProfile"));
const SearchUser = lazy(() => import("./components/searchUser"));
const Login = lazy(() => import("./components/login"));
const AuthProfile = lazy(() => import("./components/authProfile"));
const NotFound = lazy(() => import("./components/notfound"));
const AboutUs = lazy(() => import("./components/about"));
function App() {
  const [username, setUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  // ROUTER STATE
  const location = useLocation();
  return (
    <div className="App">
      <SwitchTransition component={null}>
        <CSSTransition
          key={location.pathname}
          classNames={"fade"}
          timeout={300}
          unmountOnExit
        >
          <Routes location={location}>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/user/:username" element={<UserProfile />} />
            <Route path="/search" element={<SearchUser />} />
            <Route
              path="/login"
              element={
                <Login setIsLogged={setIsLogged} setUsername={setUsername} />
              }
            />
            <Route
              path="/authProfile"
              element={
                isLogged ? (
                  <AuthProfile username={username} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default App;
