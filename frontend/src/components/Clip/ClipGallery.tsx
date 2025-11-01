import React, { useEffect, useState, useRef, memo } from "react";

import ClipThumbnail from "./ClipThumbnail";
import ClipModal from "./ClipModal";
import Paginator from "../Pagninator";
import type Clip from "../../interfaces/ClipInterface";
import LoadingSpinner from "../LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

export default memo(function ClipGallery() {
  // const [clips, setClips] = useState<Clip[]>([]);
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const [page, setPage] = useState(0);
  const [clipsPerPage, setClipsPerPage] = useState(4);
  const galleryRef = useRef<HTMLDivElement>(null);

  const { data: clips = [], isLoading } = useQuery<Clip[]>({
    queryKey: ['clips'],
    queryFn: async () => {
      const resp = await fetch("http://localhost:7071/api/listClips");
      if (!resp.ok) throw new Error('Failed to fetch clips');
      return resp.json();
    },
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
  });

  const startIdx = page * clipsPerPage;
  const endIdx = startIdx + clipsPerPage;
  const currPageClips = clips.slice(startIdx, endIdx);
  const totalPages = Math.ceil(clips.length / clipsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage === page) return;
    setPage(newPage);
  };

  const incrementPage = () => {
    setPage((p) => Math.min(p + 1, totalPages - 1));
  };

  const decrementPage = () => {
    setPage((p) => Math.max(p - 1, 0));
  };

  return (
    <>
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
      <div ref={galleryRef}>


        <Paginator
          page={page}
          totalPages={totalPages}
          onPrev={() => handlePageChange(Math.max(page - 1, 0))}
          onNext={() => handlePageChange(Math.min(page + 1, totalPages - 1))}
          setPage={handlePageChange}
        >
          {isLoading && (
            <div className="w-[100vw] flex justify-center items-center text-white gap-x-10">
              {[...Array(4)].map((_, i) => (
                <LoadingSpinner key={i} />
              ))}
            </div>
          )}

          <div
            className="grid grid-rows-1 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {currPageClips.map((clip) => (
              <ClipThumbnail
                key={clip.RowKey}
                onClick={() => setSelectedClip(clip)}
                clip={clip}
              />
            ))}
          </div>
        </Paginator>
      </div>
    </>
  );
});