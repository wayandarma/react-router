import React, { useEffect } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchGitRepos } from "../features/repos/gitReposSlice";
const RepoList = () => {
  //State management
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.gitRepos.data);
  const status = useSelector((state) => state.gitRepos.status);
  useEffect(() => {
    dispatch(fetchGitRepos());
  }, [dispatch]);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "failed") {
    return <h1>Error loading repositories</h1>;
  }
  return (
    <div className="users-cont">
      {repos ? (
        repos.map((repo) => (
          <div className="user-card-cont" key={repo.id}>
            <img
              src={repo.owner.avatar_url}
              alt="userAvatar"
              className="user-avatar"
            />
            <span className="username">{repo.name}</span>

            <span className="repo-lang-span">Language: {repo.language}</span>
            <div>
              By: <button className="repo-owner">{repo.owner.login}</button>
            </div>

            <button>
              <button>View Repo</button>
            </button>
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default RepoList;
