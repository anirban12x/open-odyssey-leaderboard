import { Award } from "lucide-react";
import codeImg from "../assets/code.jpg";
import { checklistItems } from "../constants";

const Workflow = () => {
  return (
    <div className="mt-20">
      <h2 className="mt-6 text-3xl tracking-wide text-center sm:text-5xl lg:text-6xl">
        Our Hacktoberfest{" "}
        <span className="text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
          LEADERBOARD
        </span>
      </h2>
      <div className="flex flex-wrap justify-center">
        <div className="w-full p-2 lg:w-1/2">
          <img src={codeImg} alt="Coding" />
        </div>
        <div className="w-full pt-12 lg:w-1/2 ">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex p-1 pt-1 mb-8 transition-all duration-500 ease-out border-2 rounded-xl hover:border-slate-800 hover:scale-105 border-slate-600">
              <div className="items-center justify-center w-10 h-10 p-2 mx-6 text-purple-400 rounded-full bg-neutral-900">
                <Award />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md text-neutral-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
