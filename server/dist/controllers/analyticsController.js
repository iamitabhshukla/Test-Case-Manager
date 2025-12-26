"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const models_1 = require("../models");
const redis_1 = __importDefault(require("../config/redis"));
const getDashboardStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = 'dashboard_stats';
        // Perform cache check only if client is connected/open
        if (redis_1.default.isOpen) {
            const cachedData = yield redis_1.default.get(cacheKey);
            if (cachedData) {
                return res.json(JSON.parse(cachedData));
            }
        }
        const { project_id } = req.query; // Filter by project if needed (not implemented in this quick snippet)
        // Total Projects
        const totalProjects = yield models_1.Project.count();
        // Total Test Cases
        const totalTestCases = yield models_1.TestCase.count();
        // Execution Stats
        const totalExecutions = yield models_1.TestExecution.count();
        const passedExecutions = yield models_1.TestExecution.count({ where: { status: 'Pass' } });
        const failedExecutions = yield models_1.TestExecution.count({ where: { status: 'Fail' } });
        // Pass Rate
        const passRate = totalExecutions > 0 ? (passedExecutions / totalExecutions) * 100 : 0;
        const stats = {
            totalProjects,
            totalTestCases,
            totalExecutions,
            passedExecutions,
            failedExecutions,
            passRate: Math.round(passRate * 100) / 100
        };
        // Cache for 15 minutes
        if (redis_1.default.isOpen) {
            yield redis_1.default.setEx(cacheKey, 900, JSON.stringify(stats));
        }
        res.json(stats);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching analytics', error: error.message });
    }
});
exports.getDashboardStats = getDashboardStats;
