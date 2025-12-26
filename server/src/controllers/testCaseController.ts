import { Request, Response } from 'express';
import { TestCase, TestSuite } from '../models';
import { AuthRequest } from '../middleware/authMiddleware';
import { Op } from 'sequelize';

// Get all test cases
export const getTestCases = async (req: AuthRequest, res: Response) => {
    try {
        const { suite_id, priority, type, search } = req.query;
        const whereClause: any = {};

        if (suite_id) whereClause.suite_id = suite_id;
        if (priority) whereClause.priority = priority;
        if (type) whereClause.type = type;
        if (search) {
            whereClause[Op.or] = [
                { title: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } } // Using iLike for Postgres case-insensitive
            ];
        }

        const testCases = await TestCase.findAll({
            where: whereClause,
            order: [['id', 'DESC']]
        });
        res.json(testCases);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching test cases', error: error.message });
    }
};

// Get single test case
export const getTestCase = async (req: AuthRequest, res: Response) => {
    try {
        const testCase = await TestCase.findByPk(req.params.id, {
            include: [{ model: TestSuite, attributes: ['id', 'name'] }]
        });
        if (!testCase) {
            return res.status(404).json({ message: 'Test Case not found' });
        }
        res.json(testCase);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching test case', error: error.message });
    }
};

// Create test case
export const createTestCase = async (req: AuthRequest, res: Response) => {
    try {
        // req.body should match model fields
        const newTestCase = await TestCase.create(req.body);
        res.status(201).json(newTestCase);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating test case', error: error.message });
    }
};

// Update test case
export const updateTestCase = async (req: AuthRequest, res: Response) => {
    try {
        const testCase = await TestCase.findByPk(req.params.id);
        if (!testCase) {
            return res.status(404).json({ message: 'Test Case not found' });
        }

        await testCase.update(req.body);
        res.json(testCase);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating test case', error: error.message });
    }
};

// Delete test case
export const deleteTestCase = async (req: AuthRequest, res: Response) => {
    try {
        const testCase = await TestCase.findByPk(req.params.id);
        if (!testCase) {
            return res.status(404).json({ message: 'Test Case not found' });
        }

        await testCase.destroy();
        res.json({ message: 'Test Case deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting test case', error: error.message });
    }
};
