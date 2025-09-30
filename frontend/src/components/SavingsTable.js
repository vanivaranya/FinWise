import React from "react";

const categories = [
  "Food",
  "Shopping",
  "Transport",
  "Bills",
  "Entertainment",
  "Healthcare",
  "Education",
  "Travel",
  "Other",
];

const SavingsTable = ({ entries, onChangeEntry, onDeleteEntry }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md text-sm">
        <thead className="bg-blue-100 text-blue-900">
          <tr>
            <th className="py-3 px-4 border-b text-left">Date</th>
            <th className="py-3 px-4 border-b text-left">Amount</th>
            <th className="py-3 px-4 border-b text-left">Category</th>
            <th className="py-3 px-4 border-b text-left">Note</th>
            <th className="py-3 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => (
            <tr key={entry._id || idx} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  readOnly
                  value={entry.date}
                  className="bg-gray-50 border rounded px-2 py-1 w-full text-gray-700"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="number"
                  step="0.01"
                  value={entry.amount}
                  onChange={(e) => onChangeEntry(idx, "amount", e.target.value)}
                  className="border rounded px-2 py-1 w-full text-gray-700"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <select
                  value={entry.category}
                  onChange={(e) => onChangeEntry(idx, "category", e.target.value)}
                  className="border rounded px-2 py-1 w-full text-gray-700"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={entry.note}
                  onChange={(e) => onChangeEntry(idx, "note", e.target.value)}
                  className="border rounded px-2 py-1 w-full text-gray-700"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => onDeleteEntry(entry._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavingsTable;
