import React, { useEffect, useState } from "react";
import ClipThumbnail from "./ClipThumbnail";
import ClipModal from "./ClipModal";
import Pages from "../Pages";
import type Clip from "../../interfaces/ClipInterface";

export default function ClipGallery() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);

  const [page, setPage] = useState(0);
  const [clipsPerPage, setClipsPerPage] = useState(4);

  // change pagination based on screen size. this should match the grid cols in Pages children
  useEffect(() => {
    const updateClipsPerPage = () => {
      if (window.innerWidth >= 1280) {
        setClipsPerPage(4);
      } else if (window.innerWidth >= 768) {
        setClipsPerPage(3);
      } else {
        setClipsPerPage(1);
      }
    };
    updateClipsPerPage();
    window.addEventListener("resize", updateClipsPerPage);
    return () => window.removeEventListener("resize", updateClipsPerPage);
  }, []);

  useEffect(() => {
    const fetchClips = async () => {
      console.log("Fetching clips...");
      const resp = await fetch("http://localhost:7071/api/listClips");
      const data = await resp.json();

      setClips(data);
    };
    fetchClips();
  }, []);

  const startIdx = page * clipsPerPage;
  const endIdx = startIdx + clipsPerPage;
  const currPageClips = clips.slice(startIdx, endIdx);
  const totalPages = Math.ceil(clips.length / clipsPerPage);

  const decrementPage = () => {
    setPage((p) => Math.max(p - 1, 0));
  };

  const incrementPage = () => {
    setPage((p) => Math.min(p + 1, totalPages - 1));
  };
  return (
    <div className="">
      {selectedClip && (
        <ClipModal
          clip={selectedClip}
          handleClose={() => setSelectedClip(null)}
          onPrev={() => {
            const idx = currPageClips.findIndex(
              (c) => c.RowKey === selectedClip?.RowKey
            );
            if (idx > 0) {
              setSelectedClip(currPageClips[idx - 1]);
            } else if (page > 0) {
              decrementPage();
              setTimeout(() => {
                const prevPageClips = clips.slice(
                  (page - 1) * clipsPerPage,
                  page * clipsPerPage
                );
                setSelectedClip(prevPageClips[prevPageClips.length - 1]);
              }, 0);
            }
          }}
          onNext={() => {
            const idx = currPageClips.findIndex(
              (c) => c.RowKey === selectedClip?.RowKey
            );
            if (idx < currPageClips.length - 1) {
              setSelectedClip(currPageClips[idx + 1]);
            } else if (page < totalPages - 1) {
              incrementPage();
              setTimeout(() => {
                const nextPageClips = clips.slice(
                  (page + 1) * clipsPerPage,
                  (page + 2) * clipsPerPage
                );
                setSelectedClip(nextPageClips[0]);
              }, 0);
            }
          }}
          hasPrev={
            page > 0 ||
            currPageClips.findIndex((c) => c.RowKey === selectedClip?.RowKey) >
              0
          }
          hasNext={
            page < totalPages - 1 ||
            currPageClips.findIndex((c) => c.RowKey === selectedClip?.RowKey) <
              currPageClips.length - 1
          }
        />
      )}
      <Pages
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(p - 1, 0))}
        onNext={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
        setPage={setPage}
      >
        <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 h-full">
          {currPageClips.map((clip) =>
            ClipThumbnail({
              onClick: () => setSelectedClip(clip),
              clip: clip,
            })
          )}
        </div>
      </Pages>
    </div>
  );
}
