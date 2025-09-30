import React, { useEffect, useState } from "react";
import SavingsTable from "./SavingsTable";
import { toast } from "react-toastify";
import { debounce } from "../utils/debounce";
import { Plus, Filter, Wallet, Calculator, TrendingUp } from "lucide-react";

const ExpensesPage = () => {
  const [entries, setEntries] = useState([]);
  const [budget, setBudget] = useState(() => {
    const stored = localStorage.getItem("budget");
    return stored ? parseFloat(stored) : 5000;
  });
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchEntries = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/expenses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setEntries(data);
      } catch {
        toast.error("Failed to load expense entries");
      }
    };
    fetchEntries();
  }, [token]);

  const addEntry = async () => {
    const newEntry = {
      date: new Date().toISOString().split("T")[0],
      amount: 0,
      category: "Other",
      note: "",
    };
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEntry),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to add expense");
        return;
      }

      const data = await res.json();
      setEntries([...entries, data]);
      toast.success("New expense entry added");
    } catch {
      toast.error("Server error while adding expense");
    }
  };

  const persistEntry = debounce(async (id, updatedFields) => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE}/api/expenses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });
    } catch {
      toast.error("Failed to update expense");
    }
  }, 1000);

  const updateEntry = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);

    const entry = updated[index];
    if (entry._id) {
      persistEntry(entry._id, {
        date: entry.date,
        amount: parseFloat(entry.amount) || 0,
        category: entry.category,
        note: entry.note,
      });
    }
  };

  const deleteEntry = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE}/api/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(entries.filter((entry) => entry._id !== id));
      toast.success("Expense deleted");
    } catch {
      toast.error("Failed to delete expense");
    }
  };

  const showBudgetToast = debounce((value) => {
    toast.info(`Budget set to ₹${value}`);
    localStorage.setItem("budget", value);
  }, 1000);

  const handleBudgetChange = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value) || value <= 0) {
      toast.error("Please enter a valid budget amount");
      return;
    }
    setBudget(value);
    showBudgetToast(value);
  };

  const showFilterToast = debounce((type, value) => {
    toast.info(`Filtering by ${type}: ${value}`);
  }, 1000);

  const handleFilterChange = (value) => {
    setFilterValue(value);
    showFilterToast(filterType, value);
  };

  const total = entries.reduce(
    (sum, entry) => sum + (parseFloat(entry.amount) || 0),
    0
  );
  const percentage = budget > 0 ? ((total / budget) * 100).toFixed(1) : 0;

  return (
    <div>
      {percentage > 80 && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          ⚠️ Warning: You have used {percentage}% of your budget!
        </div>
      )}

      <h1 className="text-3xl font-bold text-blue-900 text-center mb-8">
        Expenses
      </h1>

      <div className="flex items-start justify-between mb-8">
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

          {filterType && filterType !== "menu" && (
            <div className="mb-6 flex justify-center">
              {filterType === "date" && (
                <input
                  type="date"
                  value={filterValue}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="border rounded px-3 py-2"
                />
              )}
              {filterType === "amount" && (
                <input
                  type="number"
                  value={filterValue}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  placeholder="Min Amount"
                  className="border rounded px-3 py-2"
                />
              )}
              {filterType === "category" && (
                <select
                  value={filterValue}
                  onChange={(e) => handleFilterChange(e.target.value)}
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

        <div className="border border-blue-300 rounded-lg shadow p-4 bg-blue-50 w-64">
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
                onChange={handleBudgetChange}
                placeholder="Set Budget"
                className="border rounded px-2 py-1 w-20"
              />
            </div>
            <div>{total}</div>
            <div>{percentage}%</div>
          </div>
        </div>
      </div>

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
        onDeleteEntry={deleteEntry}
      />
    </div>
  );
};

export default ExpensesPage;