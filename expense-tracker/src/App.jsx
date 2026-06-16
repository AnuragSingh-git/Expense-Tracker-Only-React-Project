import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();

    if (!title || !amount) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
    };

    setExpenses([newExpense, ...expenses]);
    setTitle("");
    setAmount("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  const total = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <form onSubmit={addExpense}>
        <input
          placeholder="Expense Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button>Add</button>
      </form>

      <h2>Total: ₹{total}</h2>

      {expenses.map((item) => (
        <div className="card" key={item.id}>
          <span>{item.title}</span>

          <div>
            ₹{item.amount}
            <button
              onClick={() => deleteExpense(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}