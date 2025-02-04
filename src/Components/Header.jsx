import React from "react";

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">PDF Tool</h1>
      <div>
        <button
          className={`px-4 py-2 rounded ${activeTab === "merge" ? "bg-white text-blue-600" : ""}`}
          onClick={() => setActiveTab("merge")}
        >
          Merge PDF
        </button>
        <button
          className={`ml-4 px-4 py-2 rounded ${activeTab === "split" ? "bg-white text-blue-600" : ""}`}
          onClick={() => setActiveTab("split")}
        >
          Split PDF
        </button>
      </div>
    </header>
  );
}
