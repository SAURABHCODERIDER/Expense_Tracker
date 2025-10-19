import { useState } from "react";
import Expense from "./Expense";
function Tabs() {
  const [activeTab, setActiveTab] = useState("expense");
  return (
    <div className="flex  w-full flex-col mt-8 justify-center items-center">
      <div className="grid grid-cols-1 grid-flow-col md:grid-cols-3 gap-4 p-4 shadow-2xl rounded-md border border-blue-200">
        <button
          onClick={() => setActiveTab("expense")}
          className={`${
            activeTab === "expense"
              ? "border bg-blue-600 p-4 rounded-md text-white font-bold"
              : "border bg-gray-200 p-4 rounded-md text-gray-800 font-bold"
          }`}
        >
          Expenses
        </button>
        <button
          onClick={() => setActiveTab("income")}
          className={`${
            activeTab === "income"
              ? "border bg-blue-600 p-4 rounded-md text-white font-bold"
              : "border bg-gray-200 p-4 rounded-md text-gray-800 font-bold"
          }`}
        >
          Incomes
        </button>
        <button
          onClick={() => setActiveTab("saving")}
          className={`${
            activeTab === "saving"
              ? "border bg-blue-600 p-4 rounded-md text-white font-bold"
              : "border bg-gray-200 p-4 rounded-md text-gray-800 font-bold"
          }`}
        >
          Savings
        </button>
      </div>
      <div className="w-full md:w-1/2">
        {activeTab === "expense" && <Expense />}
        {activeTab === "income" && <div>Income Tab</div>}
        {activeTab === "saving" && <div>Savings Tab</div>}
      </div>
    </div>
  );
}

export default Tabs;
