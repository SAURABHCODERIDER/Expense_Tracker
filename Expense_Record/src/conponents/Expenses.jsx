import { useState } from "react";

function Expense() {
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([
    "Food",
    "Transport",
    "Shopping",
    "Utilities",
    "Entertainment",
    "Healthcare",
    "Other",
  ]);

  const [expenseAdd, setExpenseAdd] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const [expenses, setExpenses] = useState([]);

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpenseAdd({ ...expenseAdd, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setExpenses([...expenses, { ...expenseAdd, date: new Date() }]);
    setExpenseAdd({ amount: "", category: "", description: "" });
  };

  const handleRemove = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const addCategory = () => {
    setCategories([...categories, newCategory.trim()]);
    setNewCategory("");
  };

  return (
    <div className="w-full mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Expense Tracker
      </h2>

      {/* 🧾 Expense Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Description"
          value={expenseAdd.description}
          onChange={handleExpenseChange}
          name="description"
          className="border border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-100 p-3 w-full rounded-md outline-none transition duration-200"
        />

        <input
          type="number"
          placeholder="Amount"
          value={expenseAdd.amount}
          onChange={handleExpenseChange}
          name="amount"
          className="border border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-100 p-3 w-full rounded-md outline-none transition duration-200"
        />

        <select
          name="category"
          value={expenseAdd.category}
          onChange={handleExpenseChange}
          className="border border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-100 p-3 w-full rounded-md outline-none transition duration-200"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md p-3 transition duration-200"
        >
          Add Expense
        </button>
      </form>

      {/* ➕ Add New Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <input
          type="text"
          placeholder="Add New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
           className="border border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-100 p-3 w-full rounded-md outline-none transition duration-200"
        />
        <button
          onClick={addCategory}
          className="bg-green-600 hover:bg-green-700 text-white rounded-md p-3 transition duration-200"
        >
          Add Category
        </button>
      </div>

      {/* 📊 Expense Table */}
      <div className="overflow-x-auto mt-6">
        {expenses.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Amount
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Category
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 text-sm md:text-base"
                >
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 break-words">
                    {item.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ₹{item.amount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.category}
                  </td>
                  <td
                    onClick={() => handleRemove(index)}
                    className="border border-gray-300 px-4 py-2 text-red-500 cursor-pointer hover:underline"
                  >
                    Remove
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No expenses added yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Expense;
