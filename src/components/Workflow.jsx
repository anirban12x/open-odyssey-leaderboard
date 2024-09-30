import React, { useEffect, useState } from "react";
import { GitPullRequest } from "lucide-react";
import codeImg from "../assets/code.jpg";
import axios from "axios";

const Workflow = () => {
  // State to store PR counts for each repo
  const [repo1PRs, setRepo1PRs] = useState([]);
  const [repo2PRs, setRepo2PRs] = useState([]);
  const [repo3PRs, setRepo3PRs] = useState([]);

  useEffect(() => {
    const fetchGitHubData = async (owner, repo, setPRs) => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN || process.env.REACT_APP_GITHUB_TOKEN;
        
        if (!token) {
          console.error("GitHub token is not set");
          return;
        }

        // Fetch all PRs for the repo
        const prsResponse = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=100`,
          { headers: { Authorization: `token ${token}` } }
        );

        // Count PRs for each user
        const prCounts = prsResponse.data.reduce((acc, pr) => {
          const user = pr.user.login;
          acc[user] = (acc[user] || 0) + 1;
          return acc;
        }, {});

        // Convert to array and sort
        const sortedPRs = Object.entries(prCounts)
          .map(([login, count]) => ({ login, count }))
          .sort((a, b) => b.count - a.count);

        setPRs(sortedPRs);
      } catch (error) {
        console.error("Error fetching GitHub data", error);
      }
    };

    // Fetch PR counts for each repo
    fetchGitHubData("SamarthTech", "web-dev-projects-hacktoberfest24", setRepo1PRs);
    fetchGitHubData("SamarthTech", "python-and-AIML-projects-hacktoberfest24", setRepo2PRs);
    fetchGitHubData("SamarthTech", "low-noncode-projects-hacktoberfest24", setRepo3PRs);
  }, []);

  // Function to render a leaderboard for a specific repo
  const renderLeaderboard = (prs, title) => {
    const hiddenUsers = ["darkhorse404", "SamarthTech", "anirban12x"];
    const filteredPRs = prs.filter(pr => !hiddenUsers.includes(pr.login));

    return (
      <div className="w-full p-2 lg:w-1/3">
        <h3 className="mt-6 text-2xl tracking-wide text-center mb-6">{title}</h3>
        {filteredPRs.length === 0 ? (
          <p className="text-center text-neutral-500">No Pull Requests...</p>
        ) : (
          filteredPRs.map((pr, index) => (
            <a
              key={index}
              href={`https://github.com/${pr.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex p-1 pt-1 mb-8 transition-all duration-500 ease-out border-2 rounded-xl hover:border-slate-800 hover:scale-105 border-slate-600 cursor-pointer"
            >
              <div className="items-center justify-center w-10 h-10 p-2 mx-6 text-purple-400 rounded-full bg-neutral-900">
                <GitPullRequest />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{pr.login}</h5>
                <p className="text-md text-neutral-500">
                  Pull Requests: {pr.count}
                </p>
              </div>
            </a>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="mt-20">
      <h2 className="mt-6 text-3xl tracking-wide text-center sm:text-5xl lg:text-6xl">
        Our Hacktoberfest{" "}
        <span className="text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
          PR LEADERBOARDS
        </span>
      </h2>

      <div className="flex flex-wrap justify-center">
        <div className="w-full justify-center flex ">
          <img src={codeImg} alt="Coding" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center mt-12">
        {renderLeaderboard(repo1PRs, "Web Dev Projects")}
        {renderLeaderboard(repo2PRs, "Python and AIML Projects")}
        {renderLeaderboard(repo3PRs, "Low-non Code Projects")}
      </div>
    </div>
  );
};

export default Workflow;