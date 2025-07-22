import { useState } from 'react';
import './expenseCard.css';
import SpendingPieChart from './PieChart';

// Single expense card component
function ExpenseCard({ id, amount, category, description, date, onEdit, onDelete }) {
  return (
    <div className="expenseCard">
      <div className="left">
        <div className="top">
          <p>
            {date ? new Date(date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) : 'No Date'}
          </p>
          <p>{category}</p>
        </div>
        <p>{description}</p>
      </div>
      <div className="right">
        <p style={{ color: category === 'Deposit' ? '#28a745' : '#e50000' }}>
          ${amount}
        </p>
        <div className="bottom">
          <button
            id="edit"
            onClick={() => {
              onEdit();
            }}
          >
            Edit
          </button>
          <button id="delete" onClick={() => {
              onDelete();
            }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// List of all expenses with filtering and pie chart
function ExpenseList({ initialExpenses, setEditingId, onDelete  }) {
  const expenses = initialExpenses;
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const filteredData = expenses.filter(item => {
    const itemDate = new Date(item.date_created);
    const itemMonthYear = itemDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const matchesMonth = selectedMonth === 'All' || itemMonthYear === selectedMonth;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesMonth && matchesCategory;
  });

  // Log filtered data here (outside JSX)
  console.log('Filtered Data:', filteredData);

  const categories = ['All', ...new Set(expenses.map(item => item.category))];

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
        <div className="piechart">
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
          {filteredData.map(({ expenseid, amount, category, date_created, date, description }) => (
            <ExpenseCard
              key={expenseid}              // React key prop
              id={expenseid}               // pass correct id to ExpenseCard
              amount={amount}
              category={category}
              description={description}
              date={date_created || date}
              onEdit={() => setEditingId(expenseid)}  // callback with correct id
              onDelete={() => onDelete(expenseid)} // callback with correct id
            />
          ))}
        </dl>
      </div>
    </div>
  );
}

export default ExpenseCard;
export { ExpenseList };
