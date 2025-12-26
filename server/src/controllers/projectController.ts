import { Request, Response } from 'express';
import { Project, User } from '../models';
import { AuthRequest } from '../middleware/authMiddleware';

// Get all projects
export const getProjects = async (req: AuthRequest, res: Response) => {
    try {
        const projects = await Project.findAll({
            include: [{ model: User, attributes: ['id', 'username'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(projects);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching projects', error: error.message });
    }
};

// Get single project
export const getProject = async (req: AuthRequest, res: Response) => {
    try {
        const project = await Project.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['id', 'username'] }]
        });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching project', error: error.message });
    }
};

// Create project
export const createProject = async (req: AuthRequest, res: Response) => {
    try {
        const { name, description, status } = req.body;

        // AuthRequest guarantees user exists if authenticate middleware is passed
        const project = await Project.create({
            name,
            description,
            status,
            created_by: req.user.id
        });

        res.status(201).json(project);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating project', error: error.message });
    }
};

// Update project
export const updateProject = async (req: AuthRequest, res: Response) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const { name, description, status } = req.body;
        await project.update({ name, description, status });

        res.json(project);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating project', error: error.message });
    }
};

// Delete project
export const deleteProject = async (req: AuthRequest, res: Response) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.destroy();
        res.json({ message: 'Project deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting project', error: error.message });
    }
};
