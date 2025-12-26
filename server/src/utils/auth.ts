import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models';

dotenv.config();

const SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = (user: User) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        SECRET,
        { expiresIn: '24h' }
    );
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        return null;
    }
};
