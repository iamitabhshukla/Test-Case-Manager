import { Request, Response } from 'express';
import { TestExecution, TestCase, User, Project } from '../models';
import { AuthRequest } from '../middleware/authMiddleware';
import redisClient from '../config/redis';
import sequelize from '../config/database';

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
    try {
        const cacheKey = 'dashboard_stats';

        // Perform cache check only if client is connected/open
        if (redisClient.isOpen) {
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                return res.json(JSON.parse(cachedData));
            }
        }

        const { project_id } = req.query; // Filter by project if needed (not implemented in this quick snippet)

        // Total Projects
        const totalProjects = await Project.count();

        // Total Test Cases
        const totalTestCases = await TestCase.count();

        // Execution Stats
        const totalExecutions = await TestExecution.count();
        const passedExecutions = await TestExecution.count({ where: { status: 'Pass' } });
        const failedExecutions = await TestExecution.count({ where: { status: 'Fail' } });

        // Pass Rate
        const passRate = totalExecutions > 0 ? (passedExecutions / totalExecutions) * 100 : 0;

        const stats = {
            totalProjects,
            totalTestCases,
            totalExecutions,
            passedExecutions,
            failedExecutions,
            passRate: Math.round(passRate * 100) / 100
        };

        // Cache for 15 minutes
        if (redisClient.isOpen) {
            await redisClient.setEx(cacheKey, 900, JSON.stringify(stats));
        }

        res.json(stats);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching analytics', error: error.message });
    }
};
