import React, { useEffect, useState } from "react";
import ClipThumbnail from "./ClipThumbnail";
import ClipModal from "./ClipModal";
import Pages from "../Pages";
import type Clip from "../../interfaces/ClipInterface";
import Navbar from "../Navbar";
import Button from "../Button";
import { useUser } from "../../hooks/useUser";

export default function ClipApproval() {
  const { isAuthenticated, isAdmin, user } = useUser();
  const [clips, setClips] = useState<Clip[]>([]);
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const [page, setPage] = useState(0);
  const [clipsPerPage, setClipsPerPage] = useState(4);
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("pending");

  const canApprove = isAuthenticated && isAdmin;

  useEffect(() => {
    const updateClipsPerPage = () => {
      if (window.innerWidth >= 1280) {
        setClipsPerPage(4);
      } else if (window.innerWidth >= 768) {
        setClipsPerPage(3);
      } else {
        setClipsPerPage(4);
      }
    };
    updateClipsPerPage();
    window.addEventListener("resize", updateClipsPerPage);
    return () => window.removeEventListener("resize", updateClipsPerPage);
  }, []);

  const fetchClips = async () => {
    try {
      console.log("Fetching all clips for approval...");
      const resp = await fetch("http://localhost:7071/api/listAllClips");
      const data = await resp.json();
      setClips(data);
    } catch (err) {
      console.error("Error fetching clips:", err);
    }
  };

  useEffect(() => {
    if (canApprove) {
      fetchClips();
    }
  }, [canApprove]);

  const handleApproval = async (clipId: string, approved: boolean) => {
    try {
      const resp = await fetch("http://localhost:7071/api/setClipApproval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clipId,
          approved,
          userEmail: user.email,
        }),
      });

      if (resp.ok) {
        await fetchClips();
        setSelectedClip(null);
      } else {
        alert("Failed to update approval status");
      }
    } catch (err) {
      console.error("Error updating approval:", err);
      alert("Error updating approval status");
    }
  };

  if (!canApprove) {
    return (
      <div className="text-white text-center p-8">
        <p>You do not have permission to approve clips.</p>
        <p className="text-sm text-gray-400 mt-2">
          Contact an admin for access.
        </p>
      </div>
    );
  }

  const filteredClips = clips.filter((clip) => {
    if (filter === "all") return true;
    if (filter === "pending")
      return clip.approved === null || clip.approved === undefined;
    if (filter === "approved") return clip.approved === true;
    if (filter === "rejected") return clip.approved === false;
    return true;
  });

  const startIdx = page * clipsPerPage;
  const endIdx = startIdx + clipsPerPage;
  const currPageClips = filteredClips.slice(startIdx, endIdx);
  const totalPages = Math.ceil(filteredClips.length / clipsPerPage);

  return (
    <>
      <Navbar />
      <div className="bg-gray-600 w-full min-h-screen p-6 lg:p-12">
        <div className="text-white">
          <div className="flex gap-2 mb-4">
            <Button
              content={`Pending (${
                clips.filter(
                  (c) => c.approved === null || c.approved === undefined
                ).length
              })`}
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded ${
                filter === "pending"
                  ? "bg-yellow-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            />
            <Button
              content={`Approved (${
                clips.filter((c) => c.approved === true).length
              })`}
              onClick={() => setFilter("approved")}
              className={`px-4 py-2 rounded ${
                filter === "approved"
                  ? "bg-green-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            />
            <Button
              content={`Rejected (${
                clips.filter((c) => c.approved === false).length
              })`}
              onClick={() => setFilter("rejected")}
              className={`px-4 py-2 rounded ${
                filter === "rejected"
                  ? "bg-red-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            />
            <Button
              content={`All (${clips.length})`}
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded ${
                filter === "all"
                  ? "bg-blue-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            />
          </div>

          {selectedClip && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
              onClick={() => setSelectedClip(null)}
            >
              <div
                className="bg-njit-navy p-4 rounded w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  content="Close"
                  className="text-white bg-red-600 mb-2 float-right px-4 py-2 rounded"
                  onClick={() => setSelectedClip(null)}
                />
                <ClipModal
                  clip={selectedClip}
                  handleClose={() => setSelectedClip(null)}
                  onPrev={() => {
                    const idx = currPageClips.findIndex(
                      (c) => c.RowKey === selectedClip?.RowKey
                    );
                    if (idx > 0) setSelectedClip(currPageClips[idx - 1]);
                  }}
                  onNext={() => {
                    const idx = currPageClips.findIndex(
                      (c) => c.RowKey === selectedClip?.RowKey
                    );
                    if (idx < currPageClips.length - 1)
                      setSelectedClip(currPageClips[idx + 1]);
                  }}
                  hasPrev={
                    currPageClips.findIndex(
                      (c) => c.RowKey === selectedClip?.RowKey
                    ) > 0
                  }
                  hasNext={
                    currPageClips.findIndex(
                      (c) => c.RowKey === selectedClip?.RowKey
                    ) <
                    currPageClips.length - 1
                  }
                />
              </div>
            </div>
          )}

          <Pages
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((p) => Math.max(p - 1, 0))}
            onNext={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            setPage={setPage}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 h-full">
              {currPageClips.map((clip) => (
                <div key={clip.RowKey} className="relative">
                  {ClipThumbnail({
                    onClick: () => setSelectedClip(clip),
                    clip: clip,
                  })}
                  <div className="absolute bottom-20 right-2">
                    {clip.approved === true && (
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                        ✓ Approved
                      </span>
                    )}
                    {clip.approved === false && (
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                        ✗ Rejected
                      </span>
                    )}
                    {(clip.approved === null ||
                      clip.approved === undefined) && (
                      <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-bold">
                        ⏳ Pending
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4 mt-4 justify-center">
                    <Button
                      content="Approve"
                      onClick={() => handleApproval(clip.RowKey, true)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold"
                    />
                    <Button
                      content="Reject"
                      onClick={() => handleApproval(clip.RowKey, false)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Pages>

          {filteredClips.length === 0 && (
            <div className="text-center text-gray-400 mt-8">
              <p>No clips found for "{filter}" filter.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
