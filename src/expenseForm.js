import React, { useState } from 'react';
import './App.css';

const ExpenseForm = ({ onSubmitExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalCategory = category === 'Custom' ? customCategory : category;

    if (!amount || !finalCategory || !date) {
      alert("Please fill out Amount, Category, and Date.");
      return;
    }

    const expenseData = {
      amount,
      category,
      description,
      date
    };

    console.log("Expense Submitted:", expenseData);
    onSubmitExpense(expenseData);
    setAmount('');
    setCategory('');
    setCustomCategory('');
    setDescription('');
    setDate('');
  };

  return (
    <div className="form-wrapper">
      <form className="expense-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add New Expense:</h2>

        <div className="form-group">
          <label>💰 Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 45.99"
          />
        </div>

        <div className="form-group">
          <label>📂 Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Select Category --</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Groceries">Groceries</option>
            <option value="Deposit">Deposit</option>
            <option value="Custom">Custom...</option>
          </select>
        </div>

        {category === 'Custom' && (
          <div className="form-group">
            <label>Enter Custom Category</label>
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="e.g. Vet, Fitness, Books"
            />
          </div>
        )}

        <div className="form-group">
          <label>📝 Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Lunch with friends"
          />
        </div>

        <div className="form-group">
          <label>📅 Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button className="submit-btn" type="submit">Submit Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
