import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


export const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const user = await prisma.user.findFirst({ where: { access_token: token } });
    if (!user) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;
    next();
};
