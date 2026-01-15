import express from 'express';

import { createTransactions, getTransactionsByUserId, deleteTransaction, updateTransactionsByUserId, getSummaryByUserId } from '../controllers/transactionsController.js';

const router = express.Router();

router.post('/', createTransactions);

router.get('/:user_id', getTransactionsByUserId);

router.delete('/:id', deleteTransaction);

router.put('/:id', updateTransactionsByUserId);

router.get('/summary/:user_id', getSummaryByUserId);

export default router;