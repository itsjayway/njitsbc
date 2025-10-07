import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";

export default function VideoUpload() {
  const { instance } = useMsal();
  const username = instance.getActiveAccount()?.name || "User";

  const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

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
            user: username,
          }),
        });
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
    <div className="flex flex-col space-y-4 bg-njit-navy p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Upload Your Skate Clip</h2>
      <input
        type="file"
        className="p-2 rounded bg-njit-navy-dark"
        accept="video/*"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <input
        type="date"
        className="p-2 rounded bg-njit-navy-dark"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        className="p-2 rounded bg-njit-navy-dark"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="p-2 rounded bg-njit-navy-dark"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
