import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting (Global basic limit)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import testSuiteRoutes from './routes/testSuiteRoutes';
import testCaseRoutes from './routes/testCaseRoutes';
import testExecutionRoutes from './routes/testExecutionRoutes';
import analyticsRoutes from './routes/analyticsRoutes';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/test-suites', testSuiteRoutes);
app.use('/api/test-cases', testCaseRoutes);
app.use('/api/test-executions', testExecutionRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
    res.send('Test Case Management System API');
});

export default app;
