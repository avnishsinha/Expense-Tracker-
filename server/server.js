// server.js

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "ExpenseTracker",
  password: "WebProgramming",
  port: 5432,
});
db.connect();

// Get all expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM expenses ORDER BY date_created DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching expenses:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Add a new expense
app.post("/api/expenses", async (req, res) => {
  const { amount, category, description, date_created } = req.body;

  try {
    await db.query(
      "INSERT INTO expenses (amount, category, description, date_created) VALUES ($1, $2, $3, $4)",
      [amount, category, description, date_created]
    );
    res.sendStatus(201);
  } catch (err) {
    console.error("Error adding expense:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update an expense
app.put("/api/expenses/:id", async (req, res) => {
  const expenseid = req.params.id;
  const { amount, category, description, date_created } = req.body;

  try {
    const result = await db.query("SELECT * FROM expenses WHERE expenseid = $1", [expenseid]);
    const expense = result.rows[0];

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    await db.query(
      `UPDATE expenses
       SET amount = $1, category = $2, description = $3, date_created = $4
       WHERE expenseid = $5`,
      [amount, category, description, date_created, expenseid]
    );

    res.json({ success: true, message: "Expense updated" });
  } catch (err) {
    console.error("Error updating expense:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
