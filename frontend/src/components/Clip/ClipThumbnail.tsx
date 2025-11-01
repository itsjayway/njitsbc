import React, { memo } from "react";
import type Clip from "../../interfaces/ClipInterface";
import validateFileExt from "../../utils/validateFileExt";
import classes from "../../utils/classes";
import { useUser } from "../../hooks/useUser";

import placeholder from "../../assets/images/placeholder.jpg";

interface ClipThumbnailProps {
  onClick: () => void;
  clip: Clip;
}

export default memo(function ClipThumbnail({ onClick, clip }: ClipThumbnailProps) {
  const { user } = useUser();
  const username = user?.displayName;

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

        {/* media type chip */}
        <div className="hidden sm:flex absolute bottom-3 right-3">
          <span
            className={classes(
              "bg-opacity-75 px-2 py-1 rounded-lg text-sm",
              "bg-gray-400 text-gray-800 font-light"
            )}
          >
            {clipIsVideo ? "Video" : "Image"}
          </span>
        </div>


        {(clipIsImage || clipIsVideo) && clip.thumbnail ? (
          <img
            src={clip.thumbnail}
            className={classes(
              "object-cover rounded-2xl aspect-square w-full transition-opacity duration-300",
            )}
            alt={clip.description || "Clip thumbnail"}
            loading="lazy"
          />
        ) : (
          <img
            src={placeholder}
            className={classes(
              "object-cover rounded-2xl aspect-square w-full transition-opacity duration-300",
            )}
            alt="Placeholder"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
});