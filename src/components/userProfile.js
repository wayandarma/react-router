import React, { useEffect } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGitUser } from "../features/users/gitUserSlice";

const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const gitUserData = useSelector((state) => state.gitUser.data);
  const status = useSelector((state) => state.gitUser.status);
  const error = useSelector((state) => state.gitUser.error);

  useEffect(() => {
    if (username) {
      dispatch(fetchGitUser(username));
    }
  }, [dispatch, username]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    gitUserData && (
      <div className="user-profile-main-cont">
        <div className="top-cont">
          <img
            src={gitUserData.avatar_url}
            className="user-avatar-img"
            alt="user-img"
          />
          <div className="name-cont">
            <span>{gitUserData.login}</span>
            <h2>{gitUserData.name}</h2>
            <h3>{gitUserData.location}</h3>
            <div className="follow-cont">
              <span className="followers">
                Followers: {gitUserData.followers}
              </span>
              <span>Following: {gitUserData.following}</span>
            </div>
            <a
              className="view-ongit-a"
              href={gitUserData.html_url}
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </a>
          </div>
        </div>
        <div className="bottom-cont">
          <h3>{gitUserData.bio}</h3>
        </div>
      </div>
    )
  );
};

export default UserProfile;
