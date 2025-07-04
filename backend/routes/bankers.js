import express from 'express';
import { authMiddleware } from '../Auth/auth.js';
import { bankerOnlyMiddleware } from '../Auth/bankerAuth.js';
import { getCustomers } from '../controller/banker.js';
import { getTransactions } from '../controller/banker.js';

const router = express.Router();


router.get("/customers", authMiddleware, bankerOnlyMiddleware, getCustomers);
router.get('/customer/:user_id', authMiddleware, bankerOnlyMiddleware, getTransactions);

export default router;
