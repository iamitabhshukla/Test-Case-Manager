"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testSuiteController_1 = require("../controllers/testSuiteController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticate);
router.get('/', testSuiteController_1.getTestSuites);
router.post('/', (0, authMiddleware_1.authorize)(['admin', 'test-lead']), testSuiteController_1.createTestSuite);
router.put('/:id', (0, authMiddleware_1.authorize)(['admin', 'test-lead']), testSuiteController_1.updateTestSuite);
router.delete('/:id', (0, authMiddleware_1.authorize)(['admin', 'test-lead']), testSuiteController_1.deleteTestSuite);
exports.default = router;
