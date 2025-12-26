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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExecutions = exports.executeTest = void 0;
const models_1 = require("../models");
const executeTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { test_case_id, status, result, comments } = req.body;
        const execution = yield models_1.TestExecution.create({
            test_case_id,
            user_id: req.user.id,
            status,
            result,
            comments
        });
        // Invalidate cache if needed (e.g., analytics)
        res.status(201).json(execution);
    }
    catch (error) {
        res.status(500).json({ message: 'Error executing test', error: error.message });
    }
});
exports.executeTest = executeTest;
const getExecutions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const executions = yield models_1.TestExecution.findAll({
            where: req.query.test_case_id ? { test_case_id: req.query.test_case_id } : {},
            include: [{ model: models_1.User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']],
            limit: 100 // Pagination needed for production
        });
        res.json(executions);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching executions', error: error.message });
    }
});
exports.getExecutions = getExecutions;
