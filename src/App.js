import React, { useState, useEffect } from "react";
import ExpenseForm from './expenseForm';
import { ExpenseList } from "./expenseCard";

function App() {
  const [expenses, setExpenses] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/expenses")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .then((data) => setExpenses(data))
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}, []);

  const handleAddExpense = async (newExpense) => {
    await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpense),
    });

    // Refresh list from backend
    const res = await fetch("http://localhost:5000/api/expenses");
    const updated = await res.json();
    setExpenses(updated);
  };

  return (
    <div className="App">
      <h1>Expense Tracker - Phase 2</h1>
      <ExpenseForm onSubmitExpense={handleAddExpense} />
      <ExpenseList initialExpenses={expenses} />
    </div>
  );
}

export default App;
