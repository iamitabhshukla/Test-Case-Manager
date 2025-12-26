import express from 'express';
import { register, login } from '../controllers/authController';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // strict limit for auth
    message: 'Too many login attempts, please try again later'
});

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);

export default router;
