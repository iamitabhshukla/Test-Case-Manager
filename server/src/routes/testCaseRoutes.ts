import express from 'express';
import { getTestCases, getTestCase, createTestCase, updateTestCase, deleteTestCase } from '../controllers/testCaseController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.get('/', getTestCases);
router.get('/:id', getTestCase);

// Restricted to Admin and Test-Lead
router.post('/', authorize(['admin', 'test-lead']), createTestCase);
router.put('/:id', authorize(['admin', 'test-lead']), updateTestCase);
router.delete('/:id', authorize(['admin', 'test-lead']), deleteTestCase);

export default router;
