import TestData from './testData';
import { useState } from 'react';
import './expenseCard.css';

function ExpenseCard({ amount, category, description, date }) {

  return (
    <div className="expenseCard">
      <div className="left">
        <div className="top">
          <p>{new Date(date).toLocaleDateString()}</p>
          <p>{category}</p>
        </div>
        <p>{description}</p>
      </div>
      <div className="right">
        <p style={{ 
          color: category === 'Deposit' 
          ? '#28a745' 
          : '#e50000' }}>
          ${amount}
        </p>
        <div className="bottom">
          <button id="edit">Edit</button>
          <button id="delete">Delete</button>
        </div>
      </div>
    </div>
  );
}

function ExpenseList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(TestData.map(item => item.category))];

  const filteredData =
    selectedCategory === 'All'
      ? TestData
      : TestData.filter(item => item.category === selectedCategory);
  const balance = TestData.reduce((sum, item) => {
  return item.category === 'Deposit'
    ? sum + parseFloat(item.amount)
    : sum - parseFloat(item.amount);
  }, 0);
  return (
    <div className="body">
      <div className="currentBal">
        <p>Current Balance: </p>
        <p>${balance}</p>

      </div>
      <div className="filter">
        <select className="categories"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        
      </div>

      <dl>
        {filteredData.map(({ id, amount, category, date, description }) => (
          <ExpenseCard
            key={id}
            amount={amount}
            category={category}
            date={date}
            description={description}
          />
        ))}
      </dl>
    </div>
  );
}

export default ExpenseCard;
export { ExpenseList };
