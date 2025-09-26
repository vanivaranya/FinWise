import React, { useState } from "react";
import SavingsTable from "./SavingsTable";
import { Plus, Filter, Wallet, Calculator, TrendingUp } from "lucide-react";

const ExpensesPage = () => {
  const [entries, setEntries] = useState([
    {
      date: new Date().toISOString().split("T")[0], // current date
      amount: "",
      category: "Other",
      note: "",
    },
  ]);

  const [budget, setBudget] = useState(5000);
  const total = entries.reduce(
    (sum, entry) => sum + (parseFloat(entry.amount) || 0),
    0
  );
  const percentage = budget > 0 ? ((total / budget) * 100).toFixed(1) : 0;

  const addEntry = () => {
    setEntries([
      ...entries,
      {
        date: new Date().toISOString().split("T")[0],
        amount: "",
        category: "Other",
        note: "",
      },
    ]);
  };

  const updateEntry = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");


  return (
    <div>
      {/* Warning Alert */}
      {percentage > 80 && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          ⚠️ Warning: You have used {percentage}% of your budget!
        </div>
      )}

      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-900 text-center mb-8">
        Expenses
      </h1>

      {/* Controls + Budget Box */}
      <div className="flex items-start justify-between mb-8">
        {/* Centered Controls */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6">

          <button
            onClick={addEntry}
            className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <Plus className="mr-2 w-4 h-4" /> New Entry
          </button>
          <div className="relative">
  <button
    onClick={() => setFilterType(filterType ? "" : "menu")}
    className="flex items-center border border-blue-600 text-blue-600 px-5 py-2 rounded-lg shadow hover:bg-blue-50 transition"
  >
    <Filter className="mr-2 w-4 h-4" /> Filter
  </button>

  {/* Dropdown Menu */}
  {filterType === "menu" && (
    <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-md w-40">
      <button
        onClick={() => setFilterType("date")}
        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
      >
        Date
      </button>
      <button
        onClick={() => setFilterType("amount")}
        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
      >
        Amount
      </button>
      <button
        onClick={() => setFilterType("category")}
        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
      >
        Category
      </button>
    </div>
  )}
</div>
{/* Filter Input */}
{filterType && filterType !== "menu" && (
  <div className="mb-6 flex justify-center">
    {filterType === "date" && (
      <input
        type="date"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        className="border rounded px-3 py-2"
      />
    )}
    {filterType === "amount" && (
      <input
        type="number"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        placeholder="Min Amount"
        className="border rounded px-3 py-2"
      />
    )}
    {filterType === "category" && (
      <select
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Shopping">Shopping</option>
        <option value="Transport">Transport</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Education">Education</option>
        <option value="Travel">Travel</option>
        <option value="Other">Other</option>
      </select>
    )}
  </div>
)}

        </div>


        {/* Budget Box */}
        <div className="border border-blue-300 rounded-lg shadow p-4 bg-blue-50 w-64">

  {/* Two-row layout */}
  <div className="grid grid-cols-3 gap-4 text-center font-medium text-blue-700">
  <div className="flex items-center justify-center">
    <Wallet className="mr-1 w-4 h-4" />
    Budget
  </div>
  <div className="flex items-center justify-center">
    <Calculator className="mr-1 w-4 h-4" />
    Total
  </div>
  <div className="flex items-center justify-center">
    <TrendingUp className="mr-1 w-4 h-4" />
    Used
  </div>

    <div>
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.budget.value)}
        placeholder="Set Budget"
        className="border rounded px-2 py-1 w-20"
      />
    </div>
    <div>{total}</div>
    <div>{percentage}%</div>
  </div>
</div>
  </div>

      {/* Table */}
      <SavingsTable
  entries={entries.filter((entry) => {
    if (filterType === "date" && filterValue) {
      return new Date(entry.date) >= new Date(filterValue);
    }
    if (filterType === "amount" && filterValue) {
      return parseFloat(entry.amount) >= parseFloat(filterValue);
    }
    if (filterType === "category" && filterValue) {
      return entry.category === filterValue;
    }
    return true;
  })}
  onChangeEntry={updateEntry}
/>

    </div>
  );
};

export default ExpensesPage;
