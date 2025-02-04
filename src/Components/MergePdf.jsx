import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem"; // ✅ Corrected import path
import axios from "axios";

export default function MergePDF() {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
  });

  // Handle drag-and-drop reordering
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const oldIndex = files.findIndex((f) => f.name === active.id);
    const newIndex = files.findIndex((f) => f.name === over.id);
    setFiles(arrayMove(files, oldIndex, newIndex));
  };

  const handleMerge = async () => {
    if (files.length === 0) {
      alert("Please add at least one PDF file.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post("http://localhost:5000/merge", formData, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error merging PDFs", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
      <h2 className="text-xl font-bold mb-4">Merge PDFs</h2>
      <div {...getRootProps()} className="border-2 border-dashed p-6 text-center cursor-pointer bg-gray-50">
        <input {...getInputProps()} />
        <p>Drag & drop PDFs here, or click to select</p>
      </div>

      {files.length > 0 && (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={files.map((file) => file.name)} strategy={verticalListSortingStrategy}>
            <ul className="mt-4">
              {files.map((file, index) => (
                <SortableItem key={file.name} id={file.name}>
                  <li className="p-2 border rounded flex justify-between items-center bg-gray-200">
                    <span className="font-bold">{index + 1}.</span> {file.name}
                  </li>
                </SortableItem>
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      {files.length > 0 && (
        <button onClick={handleMerge} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Merge PDFs
        </button>
      )}
    </div>
  );
}
