import React from 'react';
import ExpenseForm from './expenseForm';
import {ExpenseList} from './expenseCard';

function App() {
  return (
    <div className="App">
      
      <h1>Expense Tracker - Phase 1</h1>
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
}

export default App;
