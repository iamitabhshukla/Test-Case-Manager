"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testCaseController_1 = require("../controllers/testCaseController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticate);
router.get('/', testCaseController_1.getTestCases);
router.get('/:id', testCaseController_1.getTestCase);
// Restricted to Admin and Test-Lead
router.post('/', (0, authMiddleware_1.authorize)(['admin', 'test-lead']), testCaseController_1.createTestCase);
router.put('/:id', (0, authMiddleware_1.authorize)(['admin', 'test-lead']), testCaseController_1.updateTestCase);
router.delete('/:id', (0, authMiddleware_1.authorize)(['admin', 'test-lead']), testCaseController_1.deleteTestCase);
exports.default = router;
