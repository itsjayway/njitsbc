import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import Navbar from "./components/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-njit-navy-dark text-white">
      <Navbar />
      <header className="flex flex-col xl:flex-row flex-1 justify-center items-center px-10 text-center bg-gradient-to-b from-njit-navy to-njit-navy-dark">
        <VideoPlayer
          className="mt-8 mb-4"
          source="https://www.youtube.com/watch?v=9hFoujPZfko"
          orientation="horizontal"
          width={720}
          height={405}
        />
        <div className="flex flex-col items-center max-w-3xl px-4 md:px-8 lg:px-16 py-8">
          <h2 className="text-3xl md:text-4xl mb-4">
            Join the NJIT Skate Club!
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
            Upload your skate clips, tag your favorite spots, and be part of the
            crew.
          </p>
          <div className="flex space-x-4 mb-4" id="join">
            <a
              href="https://njit.campuslabs.com/engage/organization/sbc"
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join on CampusLabs
            </a>
            <a
              href="#register"
              className="bg-njit-red-dark text-gray-200 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-njit-red transition"
            >
              Register to post
            </a>
          </div>
        </div>
      </header>

      <div
        className="flex flex-col md:flex-row justify-around items-center text-center py-12 bg-njit-navy"
        id="features"
      >
        <div className="max-w-sm p-4">
          <h3 className="text-2xl mb-2">Upload Clips</h3>
          <p className="text-gray-300">
            Share your best skate moments with the community.
          </p>
        </div>
        <div>
          <h3>Latest Clips</h3>
          <VideoPlayer
            source="https://njitsbcstagedvideos.blob.core.windows.net/clips/juan.mp4"
            orientation="vertical"
            width={240}
            height={426}
            className="my-4"
          />
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 py-6 text-center border-t border-gray-800">
        <p>
          © {new Date().getFullYear()} NJIT Skateboard Club. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
