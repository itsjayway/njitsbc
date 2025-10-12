import React, { useEffect, useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import Navbar from "./components/Navbar";
import {
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import MediaUpload from "./components/MediaUpload";
import ClipGallery from "./components/Clip/ClipGallery";
import Button from "./components/Button";
import Login from "./components/Login";
import classes from "./utils/classes";

export default function Landing() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <MediaUpload />
      <Navbar />
      <section className="bg-gradient-to-b from-njit-navy to-njit-navy-dark p-5">

        <div
          className={classes(
            "h-full flex flex-col xl:flex-row justify-center items-center gap-x-10 gap-y-5"
          )}
        >
          <VideoPlayer
            className="min-w-[300px] w-[50vw] h-[50vh] rounded-lg"
            source="https://www.youtube.com/watch?v=9hFoujPZfko"
            orientation="horizontal"
          />

          <div className="flex flex-col text-center gap-3">
            <h2 className="text-3xl text-gray-100 font-semibold">
              Join the NJIT Skate Club!
            </h2>
            <p className="text-gray-300">
              Upload your skate clips, tag your favorite spots, and be part of
              the crew.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-x-5 gap-y-2">
              <Button
                content="Join on CampusLabs"
                className="bg-yellow-400 hover:bg-yellow-300 text-xl text-nowrap"
                onClick={() => {
                  window.open(
                    "https://njit.campuslabs.com/engage/organization/sbc",
                    "_blank"
                  );
                }}
              />
              <UnauthenticatedTemplate>
                <Login className="text-xl bg-red-700 text-nowrap" text="Login to Upload" />
              </UnauthenticatedTemplate>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center bg-gradient-to-b from-njit-navy to-njit-navy-dark p-5 sm:min-h-[15vh] min-h-[50vh]">
        <div className="hidden sm:block">
          <ClipGallery />
        </div>
        {windowWidth < 800 && (
          <p className="text-gray-200 font-bold text-center italic">Please rotate your device or visit our site on a larger screen!</p>
        )}
      </section>
      <footer className="bg-gray-900 text-gray-400 py-6 text-center border-t border-gray-800">
        <p>
          © {new Date().getFullYear()} NJIT Skateboard Club. All rights
          reserved.
        </p>
      </footer>
    </>
  );
}
