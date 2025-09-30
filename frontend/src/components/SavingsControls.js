import React from "react";
import { Plus, Filter } from "lucide-react";
import { toast } from "react-toastify";

const SavingsControls = ({ onAddEntry, onToggleFilter }) => {
  return (
    <div className="flex justify-start items-center space-x-4 mb-6">
      <button
        onClick={onAddEntry}
        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        <Plus className="mr-2 w-4 h-4" /> New Entry
      </button>

      <button
        onClick={onToggleFilter}
        className="flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-blue-50 transition"
      >
        <Filter className="mr-2 w-4 h-4" /> Filter
      </button>
    </div>
  );
};

export default SavingsControls;