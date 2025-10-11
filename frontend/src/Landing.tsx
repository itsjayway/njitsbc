import React, { useEffect } from "react";
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
  return (
    <>
      <MediaUpload />
      <Navbar />
      <section
        className={classes(
          "bg-gradient-to-b from-njit-navy to-njit-navy-dark p-5",
          "flex flex-col xl:flex-row justify-center items-center gap-x-10 gap-y-5"
        )}
      >
        <VideoPlayer
          source="https://www.youtube.com/watch?v=9hFoujPZfko"
          orientation="horizontal"
          className="mt-8"
        />

        <div className="flex flex-col text-center gap-3">
          <h2 className="text-3xl text-gray-100 font-semibold">
            Join the NJIT Skate Club!
          </h2>
          <p className="text-gray-300">
            Upload your skate clips, tag your favorite spots, and be part of
            the crew.
          </p>
          <div className="flex justify-center gap-x-5">
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
      </section>
      <section className="bg-gradient-to-b from-njit-navy to-njit-navy-dark p-5">
        <ClipGallery />
      </section>
      {/* <footer className="bg-gray-900 text-gray-400 py-6 text-center border-t border-gray-800">
        <p>
          © {new Date().getFullYear()} NJIT Skateboard Club. All rights
          reserved.
        </p>
      </footer> */}
    </>
  );
}
