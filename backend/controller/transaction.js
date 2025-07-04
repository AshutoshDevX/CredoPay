import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export const getTransactions = async (req, res) => {
    const accounts = await prisma.account.findMany({
        where: { user_id: req.user.user_id },
        include: { transactions: true }
    });

    res.json(accounts);
}


export const deposit = async (req, res) => {
    const { account_id, amount } = req.body;

    if (amount <= 0) return res.status(400).json({ message: 'Invalid deposit amount' });

    const account = await prisma.account.findFirst({
        where: { account_id, user_id: req.user.user_id }
    });

    if (!account) return res.status(404).json({ message: 'Account not found' });

    await prisma.$transaction([
        prisma.transaction.create({
            data: {
                account_id,
                type: 'deposit',
                amount
            }
        }),
        prisma.account.update({
            where: { account_id },
            data: {
                balance: { increment: amount }
            }
        })
    ]);

    res.json({ message: 'Deposit successful' });
}


export const withdraw = async (req, res) => {
    const { account_id, amount } = req.body;

    if (amount <= 0) return res.status(400).json({ message: 'Invalid withdrawal amount' });

    const account = await prisma.account.findFirst({
        where: { account_id, user_id: req.user.user_id }
    });

    if (!account) return res.status(404).json({ message: 'Account not found' });

    if (account.balance < amount) {
        return res.status(400).json({ message: 'Insufficient Funds' });
    }

    await prisma.$transaction([
        prisma.transaction.create({
            data: {
                account_id,
                type: 'withdrawal',
                amount
            }
        }),
        prisma.account.update({
            where: { account_id },
            data: {
                balance: { decrement: amount }
            }
        })
    ]);

    res.json({ message: 'Withdrawal successful' });
}