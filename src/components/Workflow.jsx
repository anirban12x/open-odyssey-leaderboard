import React, { useEffect, useState } from "react";
import { Award } from "lucide-react";
import codeImg from "../assets/code.jpg";
import axios from "axios";

const Workflow = () => {
  // State to store contributors for each repo
  const [repo1Contributors, setRepo1Contributors] = useState([]);
  const [repo2Contributors, setRepo2Contributors] = useState([]);
  const [repo3Contributors, setRepo3Contributors] = useState([]);

  useEffect(() => {
    const fetchGitHubData = async (owner, repo, setContributors) => {
      try {
        // Use import.meta.env for Vite projects, or process.env for Create React App
        const token = import.meta.env.VITE_GITHUB_TOKEN || process.env.REACT_APP_GITHUB_TOKEN;
        
        if (!token) {
          console.error("GitHub token is not set");
          return;
        }

        const contributorsResponse = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/contributors`,
          { headers: { Authorization: `token ${token}` } }
        );

        setContributors(contributorsResponse.data);
      } catch (error) {
        console.error("Error fetching GitHub data", error);
      }
    };

    // Fetch contributors for each repo
    fetchGitHubData("SamarthTech", "web-dev-projects-hacktoberfest24", setRepo1Contributors);
    fetchGitHubData("SamarthTech", "python-and-AIML-projects-hacktoberfest24", setRepo2Contributors);
    fetchGitHubData("SamarthTech", "low-noncode-projects-hacktoberfest24", setRepo3Contributors);
  }, []);

  // Function to render a leaderboard for a specific repo
  const renderLeaderboard = (contributors, title) => {
    // Array of usernames to hide
    const hiddenUsers = ["darkhorse404", "SamarthTech", "anirban12x"];

    // Filter out the users you want to hide
    const filteredContributors = contributors.filter(contributor => !hiddenUsers.includes(contributor.login));

    return (
      <div className="w-full p-2 lg:w-1/3">
        <h3 className="mt-6 text-2xl tracking-wide text-center mb-6">{title}</h3>
        {filteredContributors.length === 0 ? (
          <p className="text-center text-neutral-500">No Contributors...</p>
        ) : (
          filteredContributors.map((contributor, index) => (
            // Wrap the entire leaderboard entry in a clickable link
            <a
              key={index}
              href={contributor.html_url} // GitHub profile URL
              target="_blank"
              rel="noopener noreferrer"
              className="flex p-1 pt-1 mb-8 transition-all duration-500 ease-out border-2 rounded-xl hover:border-slate-800 hover:scale-105 border-slate-600 cursor-pointer"
            >
              <div className="items-center justify-center w-10 h-10 p-2 mx-6 text-purple-400 rounded-full bg-neutral-900">
                <Award />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{contributor.login}</h5>
                <p className="text-md text-neutral-500">
                  Contributions: {contributor.contributions}
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
          LEADERBOARDS
        </span>
      </h2>

      <div className="flex flex-wrap justify-center">
        <div className="w-full justify-center flex ">
          <img src={codeImg} alt="Coding" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center mt-12">
        {renderLeaderboard(repo1Contributors, "Web Dev Projects")}
        {renderLeaderboard(repo2Contributors, "Python and AIML Projects")}
        {renderLeaderboard(repo3Contributors, "Low-non Code Projects")}
      </div>
    </div>
  );
};

export default Workflow;