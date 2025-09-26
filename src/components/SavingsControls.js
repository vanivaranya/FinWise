import React from "react";
import { Plus, Filter } from "lucide-react";

const SavingsControls = ({ onAddEntry }) => {
  return (
    <div className="flex justify-start items-center space-x-4 mb-6">
      {/* Add New Entry */}
      <button
        onClick={onAddEntry}
        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        <Plus className="mr-2 w-4 h-4" /> New Entry
      </button>

      {/* Filter */}
      <button className="flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-blue-50 transition">
        <Filter className="mr-2 w-4 h-4" /> Filter
      </button>
    </div>
  );
};

export default SavingsControls;
