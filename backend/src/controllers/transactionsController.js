import { db } from '../config/db.js';

export async function createTransactions(req, res) {
    try {
        const { title, amount, category, user_id } = req.body;

        if (!title || !amount || !category || !user_id) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const transaction = await db`INSERT INTO transactions (user_id, title, amount, category) 
           VALUES (${user_id}, ${title}, ${amount}, ${category})
           RETURNING *
           `;

        res.status(201).json(transaction[0]);
    } catch (error) {
        console.error('Error creating transaction', error);
        res.status(500).json({ error: 'Failed to create transaction' });
    }
}

export async function getTransactionsByUserId(req, res) {
    try {
        const { user_id } = req.params;
        const transactions = await db`SELECT * FROM transactions WHERE user_id = ${user_id}`;
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
}

export async function updateTransactionsByUserId(req, res) {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'Invalid transaction ID' });
        }

        const { title, amount, category } = req.body;

        const transactions = await db`UPDATE transactions SET title = ${title}, amount = ${amount}, category = ${category} WHERE id = ${id}
          RETURNING *`;

        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error updating transactions', error);
        res.status(500).json({ error: 'Failed to update transactions' });
    }
}

export async function deleteTransaction(req, res) {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid transaction ID" });
        }

        const result = await sql`
      DELETE FROM transactions WHERE id = ${id} RETURNING *
    `;

        if (result.length === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.log("Error deleting the transaction", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getSummaryByUserId(req, res) {
    try {
        const { user_id } = req.params;

        const balanceResult = await db`SELECT COALESCE(SUM(amount), 0) AS balance FROM transactions WHERE user_id = ${user_id}`;

        const incomeResult = await db`SELECT COALESCE(SUM(amount), 0) AS income FROM transactions WHERE user_id = ${user_id} AND amount > 0`;

        const expenseResult = await db`SELECT COALESCE(SUM(amount), 0) AS expense FROM transactions WHERE user_id = ${user_id} AND amount < 0`;

        res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expense: expenseResult[0].expense
        });
    } catch (error) {
        console.error('Error getting the summary', error);
        res.status(500).json({ error: 'Failed to getting summary' });
    }
}
