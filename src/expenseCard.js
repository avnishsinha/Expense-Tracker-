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
            {date
              ? new Date(date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'No Date'}
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
          <button id="edit" onClick={onEdit}>Edit</button>
          <button id="delete" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// List of all expenses with filtering and pie chart
function ExpenseList({ initialExpenses, setEditingId, onDelete }) {
  const expenses = initialExpenses;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [months] = useState(() => {
    const currentDate = new Date();
    const result = ['All'];
    for (let i = 0; i < 36; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      result.push(monthYear);
    }
    return result;
  });

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

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date_created || expense.date);
    const expenseMonthYear = expenseDate.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

    const matchMonth = selectedMonth === 'All' || selectedMonth === expenseMonthYear;
    const matchCategory = selectedCategory === 'All' || selectedCategory === expense.category;

    return matchMonth && matchCategory;
  });

  const categories = ['All', ...new Set(expenses.map((e) => e.category))];

  const balance = filteredExpenses.reduce((total, item) => {
    return item.category === 'Deposit'
      ? total + parseFloat(item.amount)
      : total - parseFloat(item.amount);
  }, 0);

  const chartData = filteredExpenses.reduce((acc, item) => {
    const entry = acc.find((e) => e.category === item.category);
    const amount = parseFloat(item.amount);
    if (entry) {
      entry.amount += amount;
    } else {
      acc.push({ category: item.category, amount });
    }
    return acc;
  }, []);

  return (
    <div className="body">
      <div className="leftExpenseList">
        <div className="month">
          <button
            id="prevMonth"
            onClick={goToPrevMonth}
            disabled={currentMonthIndex >= months.length - 1}
          >
            &lt;
          </button>
          <p>{selectedMonth}</p>
          <button
            id="nextMonth"
            onClick={goToNextMonth}
            disabled={currentMonthIndex <= 0}
          >
            &gt;
          </button>
        </div>

        <div className="piechart">
          {chartData.length > 0 ? (
            <SpendingPieChart data={chartData} />
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
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <dl>
          {filteredExpenses.map((item) => (
            <ExpenseCard
              key={item.expenseid}
              id={item.expenseid}
              amount={item.amount}
              category={item.category}
              description={item.description}
              date={item.date_created || item.date}
              onEdit={() => setEditingId(item.expenseid)}
              onDelete={() => onDelete(item.expenseid)}
            />
          ))}
        </dl>
      </div>
    </div>
  );
}

export default ExpenseCard;
export { ExpenseList };
