import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import Navbar from "./components/Navbar";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import MediaUpload from "./components/MediaUpload";
import ClipGallery from "./components/Clip/ClipGallery";
import Button from "./components/Button";
import Login from "./components/Login";

export default function Landing() {
  return (
    <>
      <MediaUpload />
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
          <div className="flex flex-col items-center justify-center h-[70vh] max-w-3xl px-4 md:px-8 lg:px-16 py-8">
            <h2 className="text-3xl md:text-4xl mb-4">
              Join the NJIT Skate Club!
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
              Upload your skate clips, tag your favorite spots, and be part of
              the crew.
            </p>
            <div className="flex space-x-4 mb-4" id="join">
              <Button
                content="Join on CampusLabs"
                className="bg-yellow-400 hover:bg-yellow-300 text-black transition"
                onClick={() => {
                  window.open(
                    "https://njit.campuslabs.com/engage/organization/sbc",
                    "_blank"
                  );
                }}
              />
              <UnauthenticatedTemplate>
                <Login text="Login to Upload" />
              </UnauthenticatedTemplate>
            </div>
          </div>
        </header>

        <div className="flex flex-col justify-center items-center text-center px-8 py-12 gap-8">
          <h2 className="text-3xl md:text-4xl mb-4">Member Gallery</h2>
          <ClipGallery />
        </div>
        <footer className="bg-gray-900 text-gray-400 py-6 text-center border-t border-gray-800">
          <p>
            © {new Date().getFullYear()} NJIT Skateboard Club. All rights
            reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
