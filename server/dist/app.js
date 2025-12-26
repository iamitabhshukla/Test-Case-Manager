"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rate Limiting (Global basic limit)
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const testSuiteRoutes_1 = __importDefault(require("./routes/testSuiteRoutes"));
const testCaseRoutes_1 = __importDefault(require("./routes/testCaseRoutes"));
const testExecutionRoutes_1 = __importDefault(require("./routes/testExecutionRoutes"));
const analyticsRoutes_1 = __importDefault(require("./routes/analyticsRoutes"));
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/test-suites', testSuiteRoutes_1.default);
app.use('/api/test-cases', testCaseRoutes_1.default);
app.use('/api/test-executions', testExecutionRoutes_1.default);
app.use('/api/analytics', analyticsRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Test Case Management System API');
});
exports.default = app;
