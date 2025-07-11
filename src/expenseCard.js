import TestData from './testData';
import './expenseCard.css';

/*
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
*/


function ExpenseCard({ amount, category, description, date }) {
  return (
    <div className="expenseCard">
      <div className="left">
        <div className="top">
          <p>{date.toLocaleDateString()}</p>
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
  return (
    <dl>
      {TestData.map(({ id, amount, category, date, description }) => (
        <ExpenseCard
          key={id}
          amount={amount}
          category={category}
          date={date}
          description={description}
        />
      ))}
    </dl>
  );
}

export default ExpenseCard;
export { ExpenseList };