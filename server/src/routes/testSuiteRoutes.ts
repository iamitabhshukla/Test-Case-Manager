import express from 'express';
import { getTestSuites, createTestSuite, updateTestSuite, deleteTestSuite } from '../controllers/testSuiteController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.get('/', getTestSuites);
router.post('/', authorize(['admin', 'test-lead']), createTestSuite);
router.put('/:id', authorize(['admin', 'test-lead']), updateTestSuite);
router.delete('/:id', authorize(['admin', 'test-lead']), deleteTestSuite);

export default router;
