import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export const getCustomers = async (req, res) => {
    const customers = await prisma.user.findMany({
        where: { user_type: 'customer' },
        include: {
            accounts: true
        }
    });

    res.json(customers);
}

export const getTransactions = async (req, res) => {
    const { user_id } = req.params;
    const customer = await prisma.user.findUnique({
        where: { user_id: parseInt(user_id) },
        include: {
            accounts: {
                include: {
                    transactions: {
                        orderBy: { timestamp: 'desc' }
                    }
                }
            }
        }
    });

    if (!customer || customer.user_type !== 'customer') {
        return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
}