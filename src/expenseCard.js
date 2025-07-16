import TestData from './testData';
import { useState } from 'react';
import './expenseCard.css';

function ExpenseCard({ amount, category, description, date }) {
  // html for each expense card
  // date                    amount of money
  // description             buttons
  // note: color of amount changes if it is deposited or withdrawing
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

// list of expenses
function ExpenseList() {
  // selected category for filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(TestData.map(item => item.category))];

  // filter category
  const filteredData =
  // if all categories selected
    selectedCategory === 'All'
    // give all data
      ? TestData
    // else, give selected category
      : TestData.filter(item => item.category === selectedCategory);

  // month category
  const currentDate = new Date();
  // find prev 12 months
  const prevMonths = ['All'];
  for (let i = 0; i < 36; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    prevMonths.push(monthYear);
  }
  
    // React state
    const [months] = useState(prevMonths); // freeze the list
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 0 = "All"
    const selectedMonth = months[currentMonthIndex];
  // logic to go to prev month
  const goToPrevMonth = () => {
  if (currentMonthIndex < months.length - 1) {
    setCurrentMonthIndex(currentMonthIndex + 1);
  }
};
// logic to go to next month
const goToNextMonth = () => {
  if (currentMonthIndex > 0) {
    setCurrentMonthIndex(currentMonthIndex - 1);
  }
};
  // balance math
  const balance = TestData.reduce((sum, item) => {
  // if deposited
  return item.category === 'Deposit'
  // add amount
    ? sum + parseFloat(item.amount)
  // else, remove
    : sum - parseFloat(item.amount);
  }, 0);
  return (
    
// month           balance
// pie chart?      expense history
    <div className="body">
      <div className="leftExpenseList">
        <div className = "month">
          <button id="prevMonth" onClick={goToPrevMonth} disabled={currentMonthIndex >= months.length - 1}>&lt;</button>
          <p>{selectedMonth}</p>
          <button id="nextMonth" onClick={goToNextMonth} disabled={currentMonthIndex <= 0}>&gt;</button>
        </div>
      </div>
      <div className="RightExpenseList">
        
      </div>
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
