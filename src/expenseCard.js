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
        <p>${amount}</p>
        <div className="bottom">
          <button>Edit</button>
          <button>Delete</button>
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

  return (
    <div>
      <div className="filter">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
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
