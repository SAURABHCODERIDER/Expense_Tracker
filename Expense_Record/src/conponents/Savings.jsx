import React, { useState } from "react";

function Savings() {
  const [savings, setSavings] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const addSaving = () => {
    if (!amount || !category || !date) return alert("Please fill all fields!");

    const newSaving = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      note,
      date,
    };
    setSavings([...savings, newSaving]);
    setAmount("");
    setCategory("");
    setNote("");
    setDate("");
  };

  const totalSavings = savings.reduce((acc, cur) => acc + cur.amount, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h3 className="text-2xl font-bold mb-6 text-gray-700">💰 Savings</h3>

      {/* Summary */}
      <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
        <h4 className="text-lg font-semibold text-green-700">
          Total Savings: ₹{totalSavings}
        </h4>
      </div>

      {/* Add Saving Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-white p-4 rounded-lg shadow">
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Note (optional)"
          className="border p-2 rounded"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          onClick={addSaving}
          className="col-span-full md:col-span-1 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2"
        >
          Add Saving
        </button>
      </div>

      {/* Savings List */}
      <div className="bg-white shadow rounded-lg p-4">
        {savings.length > 0 ? (
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Date</th>
                <th className="border p-2 text-left">Category</th>
                <th className="border p-2 text-left">Note</th>
                <th className="border p-2 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {savings.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">{item.date}</td>
                  <td className="border p-2">{item.category}</td>
                  <td className="border p-2">{item.note || "-"}</td>
                  <td className="border p-2 text-right">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No savings added yet.</p>
        )}
      </div>
    </div>
  );
}

export default Savings;
