// frontend/src/components/ClipUploader.tsx
import { useState } from "react";

export function ClipUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const sasResp = await fetch(
      `http://localhost:8000/api/sas?filename=${encodeURIComponent(file.name)}&content_type=${file.type}`,
      { method: "POST" }
    );
    const { uploadUrl } = await sasResp.json();

    console.log("Upload URL:", uploadUrl);
    // const putResp = await fetch(uploadUrl, {
    //   method: "PUT",
    //   headers: { "x-ms-blob-type": "BlockBlob", "Content-Type": file.type },
    //   body: file,
    // });

    // if (putResp.ok) {
    //   alert("Upload successful!");
    // } else {
    //   alert("Upload failed.");
    // }

    setUploading(false);
  };

  return (
    <div className="p-4 border rounded">
      <input type="file" accept="video/*" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload Clip"}
      </button>
    </div>
  );
}
