import React from "react";

type VideoPlayerProps = {
  className?: string;
  source: string;
  orientation?: "vertical" | "horizontal";
  width?: number;
  height?: number;
};

const getEmbedUrl = (url: string): string => {
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }
  return url;
};

const isYouTube = (url: string): boolean => {
  return /youtube\.com|youtu\.be/.test(url);
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  className,
  source,
  orientation = "horizontal",
  width,
  height,
}) => {
  const defaultHorizontal = { width: 640, height: 360 };
  const defaultVertical = { width: 360, height: 640 };
  const dims =
    orientation === "vertical"
      ? {
          width: width ?? defaultVertical.width,
          height: height ?? defaultVertical.height,
        }
      : {
          width: width ?? defaultHorizontal.width,
          height: height ?? defaultHorizontal.height,
        };

  if (isYouTube(source)) {
    return (
      <iframe
        className={className}
        title="YouTube Video"
        width={dims.width}
        height={dims.height}
        src={getEmbedUrl(source)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          display: "block",
          maxWidth: "100%",
          maxHeight: "70vh",
          aspectRatio: orientation === "vertical" ? "9/16" : "16/9",
        }}
      />
    );
  }

  return (
    <video
      width={dims.width}
      height={dims.height}
      controls
      style={{
        display: "block",
        maxWidth: "100%",
        aspectRatio: orientation === "vertical" ? "9/16" : "16/9",
      }}
    >
      <source src={source} />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
