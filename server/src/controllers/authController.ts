import { Request, Response } from 'express';
import { User } from '../models';
import { generateToken } from '../utils/auth';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Default role is tester unless specified (maybe restrict admin creation?)
        // For MVP, letting anyone be admin via API if they pass role param is a security risk, 
        // but useful for setting up first admin.
        // Let's default to 'tester' if not provided, or sanitize it.

        const role = req.body.role || 'tester';

        const user = await User.create({
            username,
            email,
            password_hash: password, // Will be hashed by hook
            role
        });

        const token = generateToken(user);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error: any) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValid = await user.validatePassword(password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error: any) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};
