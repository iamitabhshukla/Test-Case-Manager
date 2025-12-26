import { Request, Response } from 'express';
import { TestExecution, TestCase, User } from '../models';
import { AuthRequest } from '../middleware/authMiddleware';

export const executeTest = async (req: AuthRequest, res: Response) => {
    try {
        const { test_case_id, status, result, comments } = req.body;

        const execution = await TestExecution.create({
            test_case_id,
            user_id: req.user.id,
            status,
            result,
            comments
        });

        // Invalidate cache if needed (e.g., analytics)

        res.status(201).json(execution);
    } catch (error: any) {
        res.status(500).json({ message: 'Error executing test', error: error.message });
    }
};

export const getExecutions = async (req: AuthRequest, res: Response) => {
    try {
        const executions = await TestExecution.findAll({
            where: req.query.test_case_id ? { test_case_id: req.query.test_case_id } : {},
            include: [{ model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']],
            limit: 100 // Pagination needed for production
        });
        res.json(executions);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching executions', error: error.message });
    }
};
