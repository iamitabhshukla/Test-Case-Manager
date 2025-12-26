"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// All routes require authentication
router.use(authMiddleware_1.authenticate);
// Read-only access for everyone
router.get('/', projectController_1.getProjects);
router.get('/:id', projectController_1.getProject);
// Admin and Test-Lead can manage projects
router.post('/', (0, authMiddleware_1.authorize)(['admin', 'test-lead']), projectController_1.createProject);
router.put('/:id', (0, authMiddleware_1.authorize)(['admin', 'test-lead']), projectController_1.updateProject);
router.delete('/:id', (0, authMiddleware_1.authorize)(['admin', 'test-lead']), projectController_1.deleteProject);
exports.default = router;
