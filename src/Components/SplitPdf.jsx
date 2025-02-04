import React, { useState } from "react";
import axios from "axios";

export default function SplitPDF() {
  const [file, setFile] = useState(null);
  const [pageRange, setPageRange] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSplit = async () => {
    if (!file || !pageRange) {
      alert("Please select a file and enter a page range.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pages", pageRange);

    try {
      const response = await axios.post("http://localhost:5000/split", formData, {
        responseType: "blob", // Important for downloading
      });

      // Create a link element and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "split-pdfs.zip";//file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error splitting PDF:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
      <h2 className="text-xl font-bold mb-4">Split PDF</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-4 border p-2 w-full" />
      <input type="text" placeholder="Enter page numbers (e.g., 1,3,5-7)" value={pageRange} onChange={(e) => setPageRange(e.target.value)} className="mb-4 border p-2 w-full" />
      <button onClick={handleSplit} className="bg-blue-600 text-white px-4 py-2 rounded">Split PDF</button>
    </div>
  );
}
