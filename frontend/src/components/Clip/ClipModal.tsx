import React, { useEffect } from "react";
import type Clip from "../../interfaces/ClipInterface";
import validateFileExt from "../../utils/validateFileExt";
import Button from "../Button";
import classes from "../../utils/classes";
import { useMsal } from "@azure/msal-react";

interface ClipModalProps {
  clip: Clip;
  handleClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}
export default function ClipModal({
  clip,
  handleClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: ClipModalProps) {
  const { instance } = useMsal();
  const username = instance.getActiveAccount()?.name;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft" && hasPrev) {
        onPrev();
      } else if (e.key === "ArrowRight" && hasNext) {
        onNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, onPrev, onNext, hasPrev, hasNext]);

  if (!clip) return null;
  const clipIsVideo = validateFileExt(clip.fileName, ["mp4", "mov", "webm"]);
  const clipIsImage = validateFileExt(clip.fileName, ["jpg", "jpeg", "png"]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-njit-navy p-10 rounded w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          content="Close"
          className="text-white bg-red-600 mb-2 float-right"
          onClick={handleClose}
        />
        {clipIsImage && (
          <img
            src={clip.blobUrl}
            className="w-full rounded object-contain max-h-[40vh]"
            alt={clip.description || "Clip image"}
          />
        )}
        {clipIsVideo && (
          <video
            src={clip.blobUrl}
            controls
            autoPlay
            className="w-full rounded object-contain max-h-[55vh]"
          />
        )}
        <div className="flex w-full justify-center items-start py-4">
          <div className="flex flex-col text-white text-left w-[100%]">
            <div className="text-left text-xl lg:text-4xl">
              <span
                className={classes(
                  "font-brick",
                  clip.uploadedBy === username ? "text-red-200" : ""
                )}
              >
                {clip.uploadedBy && `@${clip.uploadedBy}`}
              </span>
              <span>{clip.date && ` // ${clip.date}`}</span>
            </div>
            <div className="text-sm lg:text-2xl">

              <p className="">
                <strong>Description:</strong> {clip.description}
              </p>
              <p>
                <strong>Location:</strong> {clip.location}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <Button
            content="Prev"
            className="text-white bg-slate-600"
            onClick={onPrev}
            disabled={!hasPrev}
          />
          <Button
            content="Next"
            className="text-white bg-slate-600"
            onClick={onNext}
            disabled={!hasNext}
          />
        </div>
      </div>
    </div>
  );
}
