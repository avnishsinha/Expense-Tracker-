import TestData from './testData';
import { useState } from 'react';
import './expenseCard.css';
import SpendingPieChart from './PieChart';

// One expense card
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

// List of all expenses
function ExpenseList() {
  const [expenses, setExpenses] = useState(TestData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  // catergory data
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

  // Months list
  const currentDate = new Date();
  const prevMonths = ['All'];
  for (let i = 0; i < 36; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    prevMonths.push(monthYear);
  }

  const [months] = useState(prevMonths);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const selectedMonth = months[currentMonthIndex];

  // Navigate months
  const goToPrevMonth = () => {
    if (currentMonthIndex < months.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };
  const goToNextMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  // Filter data by selected category and month
  const filteredData = TestData.filter(item => {
    const itemDate = new Date(item.date);
    const itemMonthYear = itemDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const matchesMonth = selectedMonth === 'All' || itemMonthYear === selectedMonth;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesMonth && matchesCategory;
  });

  // Dynamic categories from current filtered data
  const categories = ['All', ...new Set(TestData.map(item => item.category))];

  // Calculate balance based on full TestData (not filtered)
  const balance = filteredData.reduce((sum, item) => {
    return item.category === 'Deposit'
      ? sum + parseFloat(item.amount)
      : sum - parseFloat(item.amount);
  }, 0);


  return (
    <div className="body">
      <div className="leftExpenseList">
        <div className="month">
          <button id="prevMonth" onClick={goToPrevMonth} disabled={currentMonthIndex >= months.length - 1}>&lt;</button>
          <p>{selectedMonth}</p>
          <button id="nextMonth" onClick={goToNextMonth} disabled={currentMonthIndex <= 0}>&gt;</button>
        </div>
        <div className ="piechart">
                {categoryData.length > 0 ? (
                  <SpendingPieChart data={categoryData} />
                ) : (
                  <p style={{ textAlign: 'center' }}>No expense data to display yet.</p>
                )}
        </div>
      </div>

      <div className="rightExpenseList">
        <div className="currentBal">
          <p>{selectedMonth === 'All' ? 'Overall' : selectedMonth} Balance:</p>
          <p>${balance.toFixed(2)}</p>
        </div>

        <div className="filter">
          <select
            className="categories"
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
    </div>
  );
}


export default ExpenseCard;
export { ExpenseList };
