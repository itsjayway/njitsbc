import React from "react";
import type Clip from "../../interfaces/ClipInterface";
import validateFileExt from "../../utils/validateFileExt";
import Button from "../Button";

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
  if (!clip) return null;
  const clipIsVideo = validateFileExt(clip.fileName, ["mp4", "mov", "webm"]);
  const clipIsImage = validateFileExt(clip.fileName, ["jpg", "jpeg", "png"]);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-njit-navy p-4 rounded w-full max-w-4xl"
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
            className="w-full rounded object-contain max-h-[75vh]"
            alt={clip.description || "Clip image"}
          />
        )}
        {clipIsVideo && (
          <video
            src={clip.blobUrl}
            controls
            autoPlay
            className="w-full rounded object-contain max-h-[75vh]"
          />
        )}
        <div className="text-white mt-2">
          <p>
            <strong>Description:</strong> {clip.description}
          </p>
          <p>
            <strong>Location:</strong> {clip.location}
          </p>
          <p>
            <strong>Date:</strong> {clip.date}
          </p>
          <p>
            <strong>Uploaded by:</strong> {clip.uploadedBy}
          </p>
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
