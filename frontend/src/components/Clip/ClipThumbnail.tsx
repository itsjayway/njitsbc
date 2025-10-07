import React from "react";
import type Clip from "../../interfaces/ClipInterface";
import validateFileExt from "../../utils/validateFileExt";

interface ClipThumbnailProps {
  onClick: () => void;
  clip: Clip;
}

export default function ClipThumbnail({ onClick, clip }: ClipThumbnailProps) {
  const clipIsVideo = validateFileExt(clip.fileName, ["mp4", "mov", "webm"]);
  const clipIsImage = validateFileExt(clip.fileName, ["jpg", "jpeg", "png"]);
  return (
    <div key={clip.RowKey} className="cursor-pointer" onClick={() => onClick()}>
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
      <div className="bg-black xl:block hidden">
        <p>@{clip.uploadedBy}</p>
        <p className="text-white text-sm mt-1 truncate">
          {clip.date && `${clip.date}`}
          <i>{clip.description && ` - ${clip.description}`}</i>
        </p>
      </div>
    </div>
  );
}
