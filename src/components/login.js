import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsername,
  setPassword,
  setErrorMsg,
  login,
} from "../features/auth/authSlice";
import { useEffect } from "react";
import "./styles.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, password, errorMsg, isLogged } = useSelector(
    (state) => state.auth
  );

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/authProfile");
    }
  }, [isLogged, navigate]);

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <span className="error-span">{errorMsg}</span>
      <label htmlFor="username" className="login-label">
        Username
      </label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => {
          dispatch(setUsername(e.target.value));
          dispatch(setErrorMsg(""));
        }}
        className="login-inp"
        placeholder="username"
      />
      <label htmlFor="password" className="login-label">
        Password
      </label>
      <input
        type="password"
        name="password"
        value={password}
        className="login-inp"
        onChange={(e) => {
          dispatch(setPassword(e.target.value));
          dispatch(setErrorMsg(""));
        }}
        placeholder="password"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
