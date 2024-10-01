import React, { useEffect, useState } from "react";
import { GitMerge } from "lucide-react";
import codeImg from "../assets/code.jpg";
import axios from "axios";

const Workflow = () => {
  const [repo1MergedPRs, setRepo1MergedPRs] = useState([]);
  const [repo2MergedPRs, setRepo2MergedPRs] = useState([]);
  const [repo3MergedPRs, setRepo3MergedPRs] = useState([]);
  const [overallMergedPRs, setOverallMergedPRs] = useState([]);

  useEffect(() => {
    const fetchGitHubData = async (owner, repo, setMergedPRs) => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN || process.env.REACT_APP_GITHUB_TOKEN;

        if (!token) {
          console.error("GitHub token is not set");
          return;
        }

        const prsResponse = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&base=main&per_page=100`,
          { headers: { Authorization: `token ${token}` } }
        );

        const mergedPRCounts = prsResponse.data.reduce((acc, pr) => {
          const isInvalid = pr.labels.some(label => label.name === "invalid");
          if (pr.merged_at && !isInvalid) {
            const user = pr.user.login;
            if (!acc[user]) {
              acc[user] = { count: 0, avatar_url: pr.user.avatar_url };
            }
            acc[user].count += 1;
          }
          return acc;
        }, {});

        const sortedMergedPRs = Object.entries(mergedPRCounts)
          .map(([login, data]) => ({ login, ...data }))
          .sort((a, b) => b.count - a.count);

        setMergedPRs(sortedMergedPRs);
      } catch (error) {
        console.error("Error fetching GitHub data", error);
      }
    };

    fetchGitHubData("SamarthTech", "web-dev-projects-hacktoberfest24", setRepo1MergedPRs);
    fetchGitHubData("SamarthTech", "python-and-AIML-projects-hacktoberfest24", setRepo2MergedPRs);
    fetchGitHubData("SamarthTech", "low-noncode-projects-hacktoberfest24", setRepo3MergedPRs);
  }, []);

  useEffect(() => {
    const calculateOverallLeaderboard = () => {
      const combinedPRs = [...repo1MergedPRs, ...repo2MergedPRs, ...repo3MergedPRs];
      const overallPRs = combinedPRs.reduce((acc, pr) => {
        if (!acc[pr.login]) {
          acc[pr.login] = { count: 0, avatar_url: pr.avatar_url };
        }
        acc[pr.login].count += pr.count;
        return acc;
      }, {});

      const sortedOverallPRs = Object.entries(overallPRs)
        .map(([login, data]) => ({ login, ...data }))
        .sort((a, b) => b.count - a.count);

      // Now ensure we are displaying exactly 3 users
      const filteredOverallPRs = sortedOverallPRs.filter(pr => !["darkhorse404", "SamarthTech", "anirban12x"].includes(pr.login));

      // Slice to get the top 3 users
      setOverallMergedPRs(filteredOverallPRs.slice(0, 3));
    };

    calculateOverallLeaderboard();
  }, [repo1MergedPRs, repo2MergedPRs, repo3MergedPRs]);

  const renderLeaderboard = (mergedPRs, title, isOverall = false) => {
    const hiddenUsers = ["darkhorse404", "SamarthTech", "anirban12x"];
    const filteredMergedPRs = mergedPRs.filter(pr => !hiddenUsers.includes(pr.login));

    return (
      <div className="w-full p-2 lg:w-1/3">
        <h3 className="mt-6 text-2xl tracking-wide text-center mb-6">{title}</h3>
        {filteredMergedPRs.length === 0 ? (
          <p className="text-center text-neutral-500">No Merged Pull Requests...</p>
        ) : (
          filteredMergedPRs.map((pr, index) => {
            // Use inline styles for border color for the overall leaderboard
            const borderStyle = isOverall
              ? index === 0
                ? { border: "2px solid gold" }
                : index === 1
                  ? { border: "2px solid silver" }
                  : index === 2
                    ? { border: "2px solid #cd7f32" } // Bronze color
                    : {}
              : {};

            return (
              <a
                key={index}
                href={`https://github.com/${pr.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center p-3 mb-4 transition-all duration-500 ease-out border-2 border-slate-600 rounded-xl hover:border-slate-800 hover:scale-105 cursor-pointer`}
                style={borderStyle}  // Inline style applied here
              >
                <div className="flex items-center justify-center w-10 h-10 mr-4 text-2xl font-bold text-purple-400 bg-neutral-900 rounded-full">
                  {index + 1}
                </div>
                <img
                  src={pr.avatar_url}
                  alt={`${pr.login}'s avatar`}
                  className="w-12 h-12 mr-4 rounded-full"
                />
                <div className="flex-grow">
                  <h5 className="text-xl">{pr.login}</h5>
                  <p className="text-sm text-neutral-500">
                    Merged Pull Requests: {pr.count}
                  </p>
                </div>
                <div className="text-purple-400">
                  <GitMerge size={24} />
                </div>
              </a>
            );
          })
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

      <h3 className="mt-12 text-2xl tracking-wide text-center">Overall Leaderboard</h3>
      <div className="flex flex-wrap justify-center">
        {renderLeaderboard(overallMergedPRs, "The Top 3", true)}
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
