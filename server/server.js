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
  const result = await db.query("SELECT * FROM expenses ORDER BY date_created DESC");
  res.json(result.rows);
});

// Add a new expense
app.post("/api/expenses", async (req, res) => {
  const { amount, category, description, date_created } = req.body;
  await db.query(
    "INSERT INTO expenses (amount, category, description, date_created) VALUES ($1, $2, $3, $4)",
    [amount, category, description, date_created]
  );
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
