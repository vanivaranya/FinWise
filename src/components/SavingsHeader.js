import React, { useState } from "react";

const SavingsHeader = ({ total }) => {
  const [budget, setBudget] = useState(5000); // default budget
  const percentage = budget > 0 ? ((total / budget) * 100).toFixed(1) : 0;

  return (
    <div className="flex justify-between items-start mb-8">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-blue-900">Savings</h1>

      {/* Budget Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-md w-48 text-sm">
        <div className="mb-2">
          <label className="block text-blue-900 font-semibold mb-1">Budget</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full border rounded px-2 py-1 text-blue-900 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-2">
          <span className="font-semibold text-blue-900">Total:</span> ₹{total}
        </div>
        <div>
          <span className="font-semibold text-blue-900">Used:</span> {percentage}%
        </div>
      </div>
    </div>
  );
};

export default SavingsHeader;
