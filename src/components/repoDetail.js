import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { fetchRepoDetails } from "../features/repos/gitReposSlice";
import { useSelector, useDispatch } from "react-redux";
const RepoDetail = () => {
  const dispatch = useDispatch();
  const gitRepoData = useSelector((state) => state.gitRepos.data);
  const [cloneCopy, setCloneCopy] = useState(false);
  const { name, username } = useParams();

  useEffect(() => {
    dispatch(fetchRepoDetails({ name, username }));
  }, [dispatch, name, username]);
  return (
    <div>
      <div className="top-cont">
        {gitRepoData ? (
          <>
            <img
              className="avatar-img"
              src={gitRepoData.owner.avatar_url}
              alt=""
              style={{ width: "30%" }}
            />
            <div className="name-cont">
              <span className="username">
                Owner:{" "}
                <Link to={`/users/user/${gitRepoData.owner.login}`}>
                  {gitRepoData.owner.login}
                </Link>
              </span>
              <span className="repo-lang-span">
                Language: {gitRepoData.language}
              </span>
              <h2>{gitRepoData.name}</h2>
              <div className="follow-cont">
                <a
                  className="view-ongit-a"
                  href={gitRepoData.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </a>
                <div>
                  <input
                    className="clone-url-inp"
                    type="text"
                    value={gitRepoData.clone_url}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(gitRepoData.clone_url);
                      setCloneCopy((isCopied) => !isCopied);
                      setTimeout(
                        () => setCloneCopy((isCopied) => !isCopied),
                        3000
                      );
                    }}
                  >
                    {cloneCopy ? "Copied" : "Clone"}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};
export default RepoDetail;
