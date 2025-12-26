import { Request, Response } from 'express';
import { TestSuite, TestCase } from '../models';
import { AuthRequest } from '../middleware/authMiddleware';

export const getTestSuites = async (req: AuthRequest, res: Response) => {
    try {
        const { project_id } = req.query;
        const whereClause: any = {};
        if (project_id) whereClause.project_id = project_id;

        const suites = await TestSuite.findAll({
            where: whereClause,
            include: [{ model: TestCase, attributes: ['id', 'title'] }]
        });
        res.json(suites);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching suites', error: error.message });
    }
};

export const createTestSuite = async (req: AuthRequest, res: Response) => {
    try {
        const suite = await TestSuite.create(req.body);
        res.status(201).json(suite);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating suite', error: error.message });
    }
};

export const updateTestSuite = async (req: AuthRequest, res: Response) => {
    try {
        const suite = await TestSuite.findByPk(req.params.id);
        if (!suite) {
            return res.status(404).json({ message: 'Suite not found' });
        }
        await suite.update(req.body);
        res.json(suite);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating suite', error: error.message });
    }
};

export const deleteTestSuite = async (req: AuthRequest, res: Response) => {
    try {
        const suite = await TestSuite.findByPk(req.params.id);
        if (!suite) {
            return res.status(404).json({ message: 'Suite not found' });
        }
        await suite.destroy();
        res.json({ message: 'Suite deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting suite', error: error.message });
    }
};
