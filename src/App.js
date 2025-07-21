import React, { useState } from 'react';
import ExpenseForm from './expenseForm';
import { ExpenseList } from './expenseCard';
import SpendingPieChart from './PieChart';
import TestData from './testData';

function App() {
  const [expenses, setExpenses] = useState(TestData);

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  const categoryData = expenses.reduce((acc, expense) => {
    const category = expense.category;
    const existing = acc.find(item => item.category === category);
    if (existing) {
      existing.amount += parseFloat(expense.amount);
    } else {
      acc.push({ category, amount: parseFloat(expense.amount) });
    }
    return acc;
  }, []);

  return (
    <div className="App">
      <h1>Expense Tracker - Phase 1</h1>
      <ExpenseForm onSubmitExpense={handleAddExpense} />
      {categoryData.length > 0 ? (
        <SpendingPieChart data={categoryData} />
      ) : (
        <p style={{ textAlign: 'center' }}>No expense data to display yet.</p>
      )}
      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default App;