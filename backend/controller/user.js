import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { signupSchema, loginSchema } from '../validators/authSchema.js';
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
//User SignUp Logic
export const userSignUp = async (req, res) => {
    try {
        const parsed = signupSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
        }

        const { full_name, email, phone, password, user_type } = parsed.data;

        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ email }, { phone }] }
        });

        if (existingUser) {
            return res.status(409).json({ message: 'Email or phone already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                full_name,
                email,
                phone,
                user_type,
                password: hashedPassword,
                // Now: also create account with ₹1000
                accounts: user_type === 'customer'
                    ? {
                        create: {
                            account_number: uuidv4(),        // Can replace with custom generator
                            account_type: 'savings',
                            balance: 1000
                        }
                    }
                    : undefined
            },
            include: {
                accounts: true
            }
        });

        res.status(201).json({
            message: 'Signup successful',
            user_id: newUser.user_id,
            user_type: newUser.user_type,
            full_name: newUser.full_name,
            accounts: newUser.accounts ?? []
        });

    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};




//User Sigin Logic
export const userSignIn = async (req, res) => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
        }

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

        const accessToken = uuidv4();

        await prisma.user.update({
            where: { user_id: user.user_id },
            data: { access_token: accessToken }
        });

        res.json({
            message: 'Login successful',
            access_token: accessToken,
            user_type: user.user_type,
            user_id: user.user_id,
            full_name: user.full_name
        });

    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}