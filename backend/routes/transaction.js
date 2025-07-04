import express from 'express';
import { authMiddleware } from '../Auth/auth.js';
import { deposit } from '../controller/transaction.js';
import { getTransactions } from '../controller/transaction.js';
import { withdraw } from '../controller/transaction.js';
const router = express.Router();

router.get("/transaction-history", authMiddleware, getTransactions);
router.post("/deposit", authMiddleware, deposit);
router.post("/withdraw", authMiddleware, withdraw);


export default router;