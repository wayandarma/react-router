// IMPROTANT IMPORT
import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useState, Suspense } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { appRoutes } from "./routes";

// COMPONENT
import Home from "./components/home";

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
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes location={location}>
              {appRoutes.map((route) => {
                if (route.requestAuth && !isLogged) {
                  return (
                    <Route
                      exact
                      key={route.path}
                      path={route.path}
                      element={<Navigate replace to="/login" />}
                    />
                  );
                }
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <route.component
                        setIsLogged={setIsLogged}
                        username={username}
                        setUsername={setUsername}
                      />
                    }
                  />
                );
              })}
            </Routes>
          </Suspense>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default App;
