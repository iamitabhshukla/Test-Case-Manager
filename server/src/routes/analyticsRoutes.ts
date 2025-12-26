import express from 'express';
import { getDashboardStats } from '../controllers/analyticsController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.get('/dashboard', getDashboardStats);

export default router;
