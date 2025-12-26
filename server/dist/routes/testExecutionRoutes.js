"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testExecutionController_1 = require("../controllers/testExecutionController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticate);
router.get('/', testExecutionController_1.getExecutions);
// Only admin, test-lead, tester can execute. read-only cannot.
router.post('/', (0, authMiddleware_1.authorize)(['admin', 'test-lead', 'tester']), testExecutionController_1.executeTest);
exports.default = router;
