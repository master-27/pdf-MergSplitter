import React, { useState } from "react";
import Header from "./Components/Header";
import MergePDF from "./Components/MergePdf";
import SplitPDF from "./Components/SplitPdf";

export default function App() {
  const [activeTab, setActiveTab] = useState("merge");

  return (
    <div className="h-screen w-full bg-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex items-center justify-center h-[90vh]">
        {activeTab === "merge" ? <MergePDF /> : <SplitPDF />}
      </div>
    </div>
  );
}
