import React, { useState } from "react";
import expandUpIcon from "../assets/icons/expand-up.svg";
import classes from "../utils/classes";
import { useUser } from "../hooks/useUser";

const Locations = {
  CKB: "CKB",
  "Cullimore 3-stair": "Cullimore 3-stair",
  "Campbell Flat": "Campbell Flat",
  "ME Center": "ME Center",
  Clocktower: "Clocktower",
  "Campus Center": "Campus Center",
  "Upper Green": "Upper Green",
  Tiernan: "Tiernan",
  WEC: "WEC",
  "Library Flat": "Library Flat",
  "Honors Green": "Honors Green",
} as const;

export default function MediaUpload() {
  const { isAuthenticated, isAdmin, isMember, user } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    const fileName = file.name;
    if (!fileName) {
      alert("Please enter a file name.");
      return;
    }

    if (!isAuthenticated || (!isAdmin && !isMember)) {
      alert("You must be a member or admin to upload files.");
      return;
    }

    try {
      const sasResponse = await fetch(
        `http://localhost:7071/api/getSasToken?fileName=${encodeURIComponent(
          fileName
        )}`
      );
      if (!sasResponse.ok) throw new Error("Failed to get SAS URL");
      const { sasUrl } = await sasResponse.json();
      const resp = await fetch(sasUrl, {
        method: "PUT",
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": file.type || "application/octet-stream",
        },
        body: file,
      });
      if (resp.ok) {
        const blobUrl = sasUrl.split("?")[0];
        await fetch("http://localhost:7071/api/saveVideoMetaData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName,
            date,
            location,
            description,
            blobUrl,
            user: user.displayName,
          }),
        });
        alert("Upload successful!");
      } else {
        const text = await resp.text();
        console.error("Upload failed:", text);
        alert(`Upload failed: ${text}`);
      }
    } catch (err) {
      console.error(err);
      alert(`Upload error: ${err}`);
    }
  };

  return (
    <div
      className={classes(
        "fixed bottom-10 right-10 z-50 flex flex-col items-end transition-transform duration-300",
        modalOpen ? "" : "translate-y-[90%]"
      )}
    >
      <div
        className="bg-njit-red text-white px-6 py-2 rounded-t-lg text-lg font-semibold hover:bg-njit-red-dark transition cursor-pointer flex items-center justify-center h-20 w-[75%]"
        onClick={() => setModalOpen(!modalOpen)}
      >
        Upload Media
        <img
          src={expandUpIcon}
          alt="Expand"
          className={`inline-block ml-2 w-5 h-5 transition-transform duration-300 ${
            modalOpen ? "transform rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={classes(
          "bg-njit-navy p-6 rounded-t-lg shadow-lg flex flex-col gap-4 mb-0 transition-all duration-300 ease-in-out overflow-hidden"
        )}
      >
        <input
          type="file"
          className="p-2 rounded bg-njit-navy-dark text-white"
          accept="video/*,image/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <input
          type="date"
          className="p-2 rounded bg-njit-navy-dark text-white"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          className="p-2 rounded bg-njit-navy-dark text-white"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          {Object.entries(Locations).map(([key, value]) => (
            <option key={key} value={key}>
              {value.toString()}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Description"
          className="p-2 rounded bg-njit-navy-dark text-white placeholder-gray-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleUpload}
          className="bg-njit-red text-white px-4 py-2 rounded hover:bg-njit-red-dark transition"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
