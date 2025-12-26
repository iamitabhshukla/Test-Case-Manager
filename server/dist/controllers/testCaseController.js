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
exports.deleteTestCase = exports.updateTestCase = exports.createTestCase = exports.getTestCase = exports.getTestCases = void 0;
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
// Get all test cases
const getTestCases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { suite_id, priority, type, search } = req.query;
        const whereClause = {};
        if (suite_id)
            whereClause.suite_id = suite_id;
        if (priority)
            whereClause.priority = priority;
        if (type)
            whereClause.type = type;
        if (search) {
            whereClause[sequelize_1.Op.or] = [
                { title: { [sequelize_1.Op.iLike]: `%${search}%` } },
                { description: { [sequelize_1.Op.iLike]: `%${search}%` } } // Using iLike for Postgres case-insensitive
            ];
        }
        const testCases = yield models_1.TestCase.findAll({
            where: whereClause,
            order: [['id', 'DESC']]
        });
        res.json(testCases);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching test cases', error: error.message });
    }
});
exports.getTestCases = getTestCases;
// Get single test case
const getTestCase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testCase = yield models_1.TestCase.findByPk(req.params.id, {
            include: [{ model: models_1.TestSuite, attributes: ['id', 'name'] }]
        });
        if (!testCase) {
            return res.status(404).json({ message: 'Test Case not found' });
        }
        res.json(testCase);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching test case', error: error.message });
    }
});
exports.getTestCase = getTestCase;
// Create test case
const createTestCase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // req.body should match model fields
        const newTestCase = yield models_1.TestCase.create(req.body);
        res.status(201).json(newTestCase);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating test case', error: error.message });
    }
});
exports.createTestCase = createTestCase;
// Update test case
const updateTestCase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testCase = yield models_1.TestCase.findByPk(req.params.id);
        if (!testCase) {
            return res.status(404).json({ message: 'Test Case not found' });
        }
        yield testCase.update(req.body);
        res.json(testCase);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating test case', error: error.message });
    }
});
exports.updateTestCase = updateTestCase;
// Delete test case
const deleteTestCase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testCase = yield models_1.TestCase.findByPk(req.params.id);
        if (!testCase) {
            return res.status(404).json({ message: 'Test Case not found' });
        }
        yield testCase.destroy();
        res.json({ message: 'Test Case deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting test case', error: error.message });
    }
});
exports.deleteTestCase = deleteTestCase;
