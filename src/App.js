import React, { useState, useEffect } from 'react';
import ExpenseForm from './expenseForm';
import { ExpenseList } from './expenseCard';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const expenseBeingEdited = expenses.find((e) => e.id === editingId);

  useEffect(() => {
    fetch('http://localhost:5000/api/expenses')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => setExpenses(data))
      .catch((err) => {
        console.error('Fetch error:', err);
      });
  }, []);

  const refreshExpenses = async () => {
    const res = await fetch('http://localhost:5000/api/expenses');
    const data = await res.json();
    setExpenses(data);
  };

  const handleAddExpense = async (newExpense) => {
    await fetch('http://localhost:5000/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExpense),
    });

    await refreshExpenses();
  };

  const handleUpdateExpense = async (updatedExpense) => {
    try {
      const res = await fetch(`http://localhost:5000/api/expenses/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedExpense),
      });

      if (!res.ok) throw new Error('Failed to update expense');

      await refreshExpenses();
      setEditingId(null);
    } catch (error) {
      alert(error.message);
    }
  };

  async function handleDeleteClick(expenseid) {
  try {
    const confirmed = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmed) return;

    const res = await fetch(`http://localhost:5000/api/expenses/${expenseid}`, {
      method: "DELETE",
      credentials: "include", // Only keep if your backend uses session cookies
    });

    if (!res.ok) throw new Error("Failed to delete expense");

    // Refresh expense list
    const updatedExpenses = await fetch("http://localhost:5000/api/expenses", {
      credentials: "include",
    }).then(res => res.json());

    const sorted = updatedExpenses.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setExpenses(sorted); // or whatever your state updater is called
  } catch (error) {
    alert(error.message);
  }
}

  return (
    <div className="App">
      <h1>{editingId ? 'Edit Expense' : 'Expense Tracker - Phase 2'}</h1>
      {editingId ? (
        <ExpenseForm
          existingData={expenseBeingEdited}
          onSubmitExpense={handleUpdateExpense}
          onCancel={() => setEditingId(null)}
        />
      ) : (
        <>
          <ExpenseForm onSubmitExpense={handleAddExpense} />
          <ExpenseList
            initialExpenses={expenses}
            setEditingId={setEditingId}
            onDelete={handleDeleteClick}
          />
        </>
      )}
    </div>
  );
}

export default App;
