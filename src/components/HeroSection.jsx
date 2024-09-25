import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          {" "}
          OPEN ODYSSEY
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-100 max-w-4xl">
        An Official MLH Event. Celebrating Open Source as a Part of Hacktoberfest 2024 X Samarth
      </p>
      <div className="flex justify-center my-10">
        <a
          href="https://chat.whatsapp.com/E04AothhK6U6Y1xeLatRbP"
          className="bg-gradient-to-r from-purple-500 to-purple-800 py-3 px-4 mx-3 rounded-md text-center"
        >
          Join our Community
        </a>
        <a href="https://linktr.ee/SamarthXHacktoberfest24" className="py-3 px-4 mx-3 rounded-md border text-center">
          Start Contributing
        </a>
      </div>
      {/* <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-purple-700 shadow-sm shadow-purple-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-purple-700 shadow-sm shadow-purple-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
    </div>
  );
};

export default HeroSection;
