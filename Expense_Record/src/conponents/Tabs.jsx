import { useState } from "react";
import Expense from "./Expenses";
import Incomes from "./Incomes";
import Savings from "./Savings";
function Tabs() {
  const [activeTab, setActiveTab] = useState("expense");
  return (
    <div className="flex  w-full flex-col mt-8 justify-center items-center">
      <div className="flex w-full sm:w-1/2 justify-between items-center gap-1 p-4 shadow-2xl rounded-md border border-blue-200">
        <button
          onClick={() => setActiveTab("expense")}
          className={`${
            activeTab === "expense"
              ? "border bg-blue-600 p-4 rounded-md text-white font-bold w-1/3"
              : "border bg-gray-200 p-4 rounded-md text-gray-800 font-bold w-1/3"
          }`}
        >
          Expenses
        </button>
        <button
          onClick={() => setActiveTab("income")}
          className={`${
            activeTab === "income"
              ? "border bg-blue-600 p-4 rounded-md text-white font-bold w-1/3"
              : "border bg-gray-200 p-4 rounded-md text-gray-800 font-bold w-1/3"
          }`}
        >
          Incomes
        </button>
        <button
          onClick={() => setActiveTab("saving")}
          className={`${
            activeTab === "saving"
              ? "border bg-blue-600 p-4 rounded-md text-white font-bold w-1/3"
              : "border bg-gray-200 p-4 rounded-md text-gray-800 font-bold w-1/3"
          }`}
        >
          Savings
        </button>
      </div>
      <div className="w-full md:w-1/2">
        {activeTab === "expense" && <Expense />}
        {activeTab === "income" && <Incomes/>}
        {activeTab === "saving" && <Savings/>}
      </div>
    </div>
  );
}

export default Tabs;
