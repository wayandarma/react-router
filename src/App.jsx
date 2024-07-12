// IMPROTANT IMPORT
import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Suspense, useRef } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { appRoutes } from "./routes";
import { useSelector } from "react-redux";
function App() {
  const { isLogged } = useSelector((state) => state.auth);
  const nodeRef = useRef(null);
  // ROUTER STATE
  const location = useLocation();
  return (
    <div className="App">
      <SwitchTransition component={null}>
        <CSSTransition
          nodeRef={nodeRef}
          in={true}
          timeout={300}
          classNames="fade"
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
                    element={<route.component />}
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
