import React, { useEffect, useState } from "react";
import {
    PieChart, Pie, Cell,
    LineChart, Line,
    BarChart, Bar,
    XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { TrendingUp, Calculator, Target } from "lucide-react";
import { toast } from "react-toastify";

const COLORS = ["#4F46E5", "#3B82F6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"];

const StatCard = ({ title, value, icon }) => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-md text-center">
        <div className="flex justify-center items-center mb-2 text-blue-700">{icon}</div>
        <h2 className="text-sm font-semibold text-blue-900">{title}</h2>
        <p className="text-xl font-bold text-blue-800">{value}</p>
    </div>
);

const StatsPage = () => {
    const [savings, setSavings] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [savingsRes, expensesRes] = await Promise.all([
                    fetch(`${process.env.REACT_APP_API_BASE}/api/savings`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch(`${process.env.REACT_APP_API_BASE}/api/expenses`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);
                const savingsData = await savingsRes.json();
                const expensesData = await expensesRes.json();
                setSavings(savingsData);
                setExpenses(expensesData);
            } catch {
                toast.error("Failed to load stats");
            }
        };
        fetchData();
    }, [token]);
    const budget = parseFloat(localStorage.getItem("budget")) || 5000;
    const totalSavings = savings.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    const targetReached = budget > 0 ? ((totalSavings / budget) * 100).toFixed(1) : 0;
    const budgetUsed = budget > 0 ? ((totalExpenses / budget) * 100).toFixed(1) : 0;

    const savingsCategoryData = Object.entries(
        savings.reduce((acc, entry) => {
            acc[entry.category] = (acc[entry.category] || 0) + parseFloat(entry.amount || 0);
            return acc;
        }, {})
    ).map(([name, value]) => ({ name, value }));

    const expensesCategoryData = Object.entries(
        expenses.reduce((acc, entry) => {
            acc[entry.category] = (acc[entry.category] || 0) + parseFloat(entry.amount || 0);
            return acc;
        }, {})
    ).map(([name, value]) => ({ name, value }));

    const monthlyData = Array.from({ length: 12 }, (_, i) => {
        const month = new Date(2025, i).toLocaleString("default", { month: "short" });
        const savingsTotal = savings
            .filter((e) => new Date(e.date).getMonth() === i)
            .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
        const expensesTotal = expenses
            .filter((e) => new Date(e.date).getMonth() === i)
            .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
        return { month, Savings: savingsTotal, Expenses: expensesTotal };
    });

    return (
        <div className="px-4 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-900 text-center mb-8">Stats</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <StatCard title="Savings" value={`₹${totalSavings}`} icon={<TrendingUp className="w-5 h-5" />} />
                <StatCard title="Expenses" value={`₹${totalExpenses}`} icon={<Calculator className="w-5 h-5" />} />
                <StatCard title="Target Reached" value={`${targetReached}%`} icon={<Target className="w-5 h-5" />} />
                <StatCard title="Budget Used" value={`${budgetUsed}%`} icon={<Target className="w-5 h-5" />} />
            </div>

            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 shadow text-sm text-blue-900 mb-8">
                <p>💡 You’ve saved <strong>₹{totalSavings}</strong> and spent <strong>₹{totalExpenses}</strong> this cycle.</p>
                <p>🎯 You’ve reached <strong>{targetReached}%</strong> of your savings goal and used <strong>{budgetUsed}%</strong> of your budget.</p>
            </div>

            {/* Row 1: Pie Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                    <h2 className="text-xl font-semibold text-blue-900 mb-4">Savings by Category</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={savingsCategoryData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {savingsCategoryData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-blue-900 mb-4">Expenses by Category</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={expensesCategoryData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {expensesCategoryData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Row 2: Line and Bar Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                    <h2 className="text-xl font-semibold text-blue-900 mb-4">Savings vs Expenses (Line)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Savings" stroke="#10B981" strokeWidth={2} />
                            <Line type="monotone" dataKey="Expenses" stroke="#EF4444" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-blue-900 mb-4">Savings vs Expenses (Bar)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Savings" fill="#10B981" />
                            <Bar dataKey="Expenses" fill="#EF4444" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StatsPage;