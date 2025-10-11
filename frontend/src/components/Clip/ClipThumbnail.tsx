import React from "react";
import type Clip from "../../interfaces/ClipInterface";
import validateFileExt from "../../utils/validateFileExt";
import { useMsal } from "@azure/msal-react";
import classes from "../../utils/classes";

interface ClipThumbnailProps {
  onClick: () => void;
  clip: Clip;
}

export default function ClipThumbnail({ onClick, clip }: ClipThumbnailProps) {
  const { instance } = useMsal();
  const username = instance.getActiveAccount()?.name;

  const fileNameLowercase = clip.fileName.toLowerCase();
  const clipIsVideo = validateFileExt(fileNameLowercase, ["mp4", "mov", "webm"]);
  const clipIsImage = validateFileExt(fileNameLowercase, ["jpg", "jpeg", "png"]);
  return (
    <div key={clip.RowKey} className="cursor-pointer" onClick={() => onClick()}>
      <div className="relative">

        {/* username as tag */}
        <div className="hidden sm:flex absolute top-3 right-3">
          <span
            className={classes(
              "bg-opacity-75 px-2 py-1 rounded-lg text-xl",
              clip.uploadedBy === username
                ? "bg-gray-200 text-gray-800"
                : "bg-gray-800 text-white font-light"
            )}
          >
            @{clip.uploadedBy}
          </span>
        </div>
        {clipIsImage && (
          <img
            src={clip.blobUrl}
            className="object-cover rounded-2xl aspect-square w-full"
            alt={clip.description || "Clip image"}
            loading="lazy"
          />
        )}
        {clipIsVideo && (
          <video
            src={clip.blobUrl}
            className="object-cover rounded-2xl aspect-square w-full"
            muted
            preload="metadata"
          />
        )}
      </div>
    </div>
  );
}
