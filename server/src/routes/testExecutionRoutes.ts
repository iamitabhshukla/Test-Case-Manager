import express from 'express';
import { executeTest, getExecutions } from '../controllers/testExecutionController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.get('/', getExecutions);
// Only admin, test-lead, tester can execute. read-only cannot.
router.post('/', authorize(['admin', 'test-lead', 'tester']), executeTest);

export default router;
