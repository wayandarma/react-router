import { useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  setUsername,
  resetErrorMsg,
  setErrorMsg,
  setLoading,
} from "../features/users/searchUserSlice";

const SearchUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, errorMsg, loading, attempts } = useSelector(
    (state) => state.searchUser
  );

  const handleGetUser = async () => {
    const response = await dispatch(fetchUser(username));
    if (response.type === fetchUser.fulfilled.type) {
      navigate("/users/user/" + username);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username) {
      try {
        await handleGetUser();
      } catch {
        dispatch(setLoading("Submit"));
        dispatch(
          setErrorMsg(`User Does Not Exist! ${attempts - 1} Attempts remaining`)
        );
      }
    }
  };

  useEffect(() => {
    if (attempts <= 0) {
      dispatch(setErrorMsg("Too many attempts, REDIRECTING..."));
      const timer = setTimeout(() => {
        navigate("/");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [attempts, navigate, dispatch]);

  return (
    <>
      <h3>Search User</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        {errorMsg && (
          <span style={{ fontSize: "12px", color: "orangered" }}>
            {errorMsg}
          </span>
        )}
        <input
          type="text"
          placeholder="Github Surname"
          className="login-inp"
          onChange={(e) => {
            dispatch(setUsername(e.target.value));
            dispatch(resetErrorMsg());
          }}
          value={username || ""}
        />
        <button type="submit" className="login-submit-btn">
          {loading}
        </button>
      </form>
    </>
  );
};

export default SearchUser;
