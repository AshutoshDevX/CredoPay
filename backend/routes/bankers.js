import express from 'express';
import { authMiddleware } from '../Auth/auth.js';
import { bankerOnlyMiddleware } from '../Auth/bankerAuth.js';
import { getCustomers } from '../controller/banker.js';
import { getTransactions } from '../controller/transaction.js';

const router = express.Router();


router.get("/banker/customer", authMiddleware, bankerOnlyMiddleware, getCustomers);
router.get('/banker/customer/:user_id', authMiddleware, bankerOnlyMiddleware, getTransactions);

export default router;
