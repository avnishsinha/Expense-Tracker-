CREATE TABLE expenses (
    expenseId SERIAL PRIMARY KEY,
	amount NUMERIC(10, 2),
    category VARCHAR(100),
    description TEXT,
    date_created TIMESTAMP
);

INSERT INTO expenses (amount, category, description, date_created) VALUES
(500, 'Deposit', 'Work Paycheck', '2025-05-03'),
(7.32, 'Food', 'Starbucks Treat', '2025-04-21'),
(217.64, 'Groceries', 'Groceries', '2025-06-04'),
(2534.62, 'Travel', 'Hawaii Trip', '2025-07-19'),
(10000, 'Deposit', 'Graduation', '2024-05-10');
