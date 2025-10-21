import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register all chart components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Incomes = () => {
  const [incomes, setIncomes] = useState([
    { id: 1, date: "2025-10-01", source: "Freelancing", amount: 12000, category: "Work" },
    { id: 2, date: "2025-10-05", source: "YouTube", amount: 5000, category: "Passive" },
    { id: 3, date: "2025-10-10", source: "Affiliate", amount: 3000, category: "Passive" },
  ]);

  const [form, setForm] = useState({ date: "", source: "", amount: "", category: "" });
  const [totalIncome, setTotalIncome] = useState(0);

  // ✅ Calculate total income
  useEffect(() => {
    const total = incomes.reduce((acc, cur) => acc + cur.amount, 0);
    setTotalIncome(total);
  }, [incomes]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add new income entry
  const handleAddIncome = (e) => {
    e.preventDefault();
    if (!form.date || !form.source || !form.amount || !form.category) return;
    const newIncome = {
      id: Date.now(),
      date: form.date,
      source: form.source,
      amount: parseFloat(form.amount),
      category: form.category,
    };
    setIncomes([...incomes, newIncome]);
    setForm({ date: "", source: "", amount: "", category: "" });
  };

  // ✅ Bar chart (Income by Source)
  const dataBar = {
    labels: incomes.map((i) => i.source),
    datasets: [
      {
        label: "Income (₹)",
        data: incomes.map((i) => i.amount),
        backgroundColor: "rgba(34,197,94,0.6)",
        borderRadius: 8,
      },
    ],
  };

  // ✅ Pie chart (Income by Category)
  const categoryTotals = incomes.reduce((acc, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + cur.amount;
    return acc;
  }, {});

  const dataPie = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Income by Category",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // ✅ Line chart (Income Trend by Date)
  const dataLine = {
    labels: incomes.map((i) => i.date),
    datasets: [
      {
        label: "Income Trend (₹)",
        data: incomes.map((i) => i.amount),
        fill: false,
        borderColor: "rgba(34,197,94,1)",
        backgroundColor: "rgba(34,197,94,0.6)",
        tension: 0.3,
      },
    ],
  };

  // ✅ Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <h1 className="text-xl font-semibold mb-2 text-gray-800">💰 Income Dashboard</h1>

      {/* Summary Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-2 flex justify-between items-center">
        <h2 className="text-xl font-medium">Total Income</h2>
        <p className="text-3xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</p>
      </div>

      {/* Add Income Form */}
      <form
        onSubmit={handleAddIncome}
        className="bg-white p-6 rounded-2xl shadow-md mb-2 grid grid-cols-1 md:grid-cols-5 gap-4"
      >
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded-lg"
          required
        />
        <input
          type="text"
          name="source"
          placeholder="Source"
          value={form.source}
          onChange={handleChange}
          className="border p-2 rounded-lg"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border p-2 rounded-lg"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition"
        >
          + Add
        </button>
      </form>

      {/* Table */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-2 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Source</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income) => (
              <tr key={income.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{income.date}</td>
                <td className="border border-gray-300 px-4 py-2">{income.source}</td>
                <td className="border border-gray-300 px-4 py-2">{income.category}</td>
                <td className="border border-gray-300 px-4 py-2 text-right text-green-600 font-medium">
                  ₹{income.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="bg-white shadow-md rounded-2xl p-6 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">📊 Income by Source</h2>
          <Bar data={dataBar} options={options} />
          <h2 className="text-xl font-semibold mb-4 text-gray-700">📈 Income Trend Over Time</h2>
          <Line data={dataLine} options={options} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">🥧 Income by Category</h2>
          <Pie data={dataPie} options={options} />
        </div>
       
      </div>
    </div>
  );
};

export default Incomes;
