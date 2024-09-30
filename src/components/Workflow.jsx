import React, { useEffect, useState } from "react";
import { GitMerge } from "lucide-react";
import codeImg from "../assets/code.jpg";
import axios from "axios";

const Workflow = () => {
  // State to store merged PR counts for each repo
  const [repo1MergedPRs, setRepo1MergedPRs] = useState([]);
  const [repo2MergedPRs, setRepo2MergedPRs] = useState([]);
  const [repo3MergedPRs, setRepo3MergedPRs] = useState([]);

  useEffect(() => {
    const fetchGitHubData = async (owner, repo, setMergedPRs) => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN || process.env.REACT_APP_GITHUB_TOKEN;
        
        if (!token) {
          console.error("GitHub token is not set");
          return;
        }

        // Fetch all closed PRs for the repo
        const prsResponse = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&base=main&per_page=100`,
          { headers: { Authorization: `token ${token}` } }
        );

        // Filter and count merged PRs for each user
        const mergedPRCounts = prsResponse.data.reduce((acc, pr) => {
          if (pr.merged_at) {
            const user = pr.user.login;
            acc[user] = (acc[user] || 0) + 1;
          }
          return acc;
        }, {});

        // Convert to array and sort
        const sortedMergedPRs = Object.entries(mergedPRCounts)
          .map(([login, count]) => ({ login, count }))
          .sort((a, b) => b.count - a.count);

        setMergedPRs(sortedMergedPRs);
      } catch (error) {
        console.error("Error fetching GitHub data", error);
      }
    };

    // Fetch merged PR counts for each repo
    fetchGitHubData("SamarthTech", "web-dev-projects-hacktoberfest24", setRepo1MergedPRs);
    fetchGitHubData("SamarthTech", "python-and-AIML-projects-hacktoberfest24", setRepo2MergedPRs);
    fetchGitHubData("SamarthTech", "low-noncode-projects-hacktoberfest24", setRepo3MergedPRs);
  }, []);

  // Function to render a leaderboard for a specific repo
  const renderLeaderboard = (mergedPRs, title) => {
    const hiddenUsers = ["darkhorse404", "SamarthTech"];
    const filteredMergedPRs = mergedPRs.filter(pr => !hiddenUsers.includes(pr.login));

    return (
      <div className="w-full p-2 lg:w-1/3">
        <h3 className="mt-6 text-2xl tracking-wide text-center mb-6">{title}</h3>
        {filteredMergedPRs.length === 0 ? (
          <p className="text-center text-neutral-500">No Merged Pull Requests...</p>
        ) : (
          filteredMergedPRs.map((pr, index) => (
            <a
              key={index}
              href={`https://github.com/${pr.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex p-1 pt-1 mb-8 transition-all duration-500 ease-out border-2 rounded-xl hover:border-slate-800 hover:scale-105 border-slate-600 cursor-pointer"
            >
              <div className="items-center justify-center w-10 h-10 p-2 mx-6 text-purple-400 rounded-full bg-neutral-900">
                <GitMerge />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{pr.login}</h5>
                <p className="text-md text-neutral-500">
                  Merged Pull Requests: {pr.count}
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
          MERGED PR LEADERBOARDS
        </span>
      </h2>

      <div className="flex flex-wrap justify-center">
        <div className="w-full justify-center flex ">
          <img src={codeImg} alt="Coding" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center mt-12">
        {renderLeaderboard(repo1MergedPRs, "Web Dev Projects")}
        {renderLeaderboard(repo2MergedPRs, "Python and AIML Projects")}
        {renderLeaderboard(repo3MergedPRs, "Low-non Code Projects")}
      </div>
    </div>
  );
};

export default Workflow;