import express from 'express';
import { getProjects, getProject, createProject, updateProject, deleteProject } from '../controllers/projectController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Read-only access for everyone
router.get('/', getProjects);
router.get('/:id', getProject);

// Admin and Test-Lead can manage projects
router.post('/', authorize(['admin', 'test-lead']), createProject);
router.put('/:id', authorize(['admin', 'test-lead']), updateProject);
router.delete('/:id', authorize(['admin', 'test-lead']), deleteProject);

export default router;
