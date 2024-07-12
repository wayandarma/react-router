import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGitUser } from "../features/users/gitUserSlice";

const AuthProfile = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
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

  if (!gitUserData) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="user-profile-main-cont">
      <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>YOUR PROFILE</h2>
      <div className="top-cont">
        <img
          src={gitUserData.avatar_url}
          className="user-avatar-img"
          alt="user-img"
        />
        <div className="name-cont">
          <span>{gitUserData.login}</span>
          <h2>{gitUserData.name}</h2>
          <div>
            <span style={{ display: "block" }}>
              Company:{" "}
              <span style={{ color: "purple", fontWeight: "700" }}>
                {gitUserData.company}
              </span>
            </span>
            <span>Public Repos: {gitUserData.public_repos}</span>
          </div>
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
  );
};

export default AuthProfile;
