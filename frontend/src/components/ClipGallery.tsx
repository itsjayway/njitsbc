import React, { useEffect, useState } from "react";

interface Clip {
  RowKey: string;
  fileName: string;
  blobUrl: string;
  date: string;
  description: string;
  location: string;
  uploadedBy: string;
}

export default function ClipGallery() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);

  useEffect(() => {
    const fetchClips = async () => {
      console.log("Fetching clips...");
      const resp = await fetch("http://localhost:7071/api/listClips");
      const data = await resp.json();
      console.log("Clips fetched:", data);
      setClips(data);
    };
    fetchClips();
  }, []);

  return (
    <div className="p-6">
      {selectedClip && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-njit-navy p-4 rounded w-full max-w-4xl">
            <button
              className="text-white mb-2"
              onClick={() => setSelectedClip(null)}
            >
              Close
            </button>
            <video
              src={selectedClip.blobUrl}
              controls
              autoPlay
              className="w-full rounded h-[80vh] object-contain"
            />
            <div className="text-white mt-2">
              <p>
                <strong>Description:</strong> {selectedClip.description}
              </p>
              <p>
                <strong>Location:</strong> {selectedClip.location}
              </p>
              <p>
                <strong>Date:</strong> {selectedClip.date}
              </p>
              <p>
                <strong>Uploaded by:</strong> {selectedClip.uploadedBy}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {clips.map((clip) => (
          <div
            key={clip.RowKey}
            className="cursor-pointer"
            onClick={() => setSelectedClip(clip)}
          >
            <video
              src={clip.blobUrl}
              className="w-full h-[80%] object-cover rounded"
              muted
              preload="metadata"
            />
            <p>@{clip.uploadedBy}</p>
            <p className="text-white text-sm mt-1 truncate">
              {clip.date && `${clip.date}`}
              <i>{clip.description && ` - ${clip.description}`}</i>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
