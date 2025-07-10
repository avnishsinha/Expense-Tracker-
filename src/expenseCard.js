/*
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
*/

function ExpenseCard({ amount, category, description, date}) {
    return(
    
    <div className="expenseCard">
      <dt><span>{amount}</span></dt>
      <dd>{category}</dd>
      <dd>{date}</dd>
      <dd>{description}</dd>
    </div>)};


export default ExpenseCard;
