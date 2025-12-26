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
exports.deleteTestSuite = exports.updateTestSuite = exports.createTestSuite = exports.getTestSuites = void 0;
const models_1 = require("../models");
const getTestSuites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { project_id } = req.query;
        const whereClause = {};
        if (project_id)
            whereClause.project_id = project_id;
        const suites = yield models_1.TestSuite.findAll({
            where: whereClause,
            include: [{ model: models_1.TestCase, attributes: ['id', 'title'] }]
        });
        res.json(suites);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching suites', error: error.message });
    }
});
exports.getTestSuites = getTestSuites;
const createTestSuite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const suite = yield models_1.TestSuite.create(req.body);
        res.status(201).json(suite);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating suite', error: error.message });
    }
});
exports.createTestSuite = createTestSuite;
const updateTestSuite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const suite = yield models_1.TestSuite.findByPk(req.params.id);
        if (!suite) {
            return res.status(404).json({ message: 'Suite not found' });
        }
        yield suite.update(req.body);
        res.json(suite);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating suite', error: error.message });
    }
});
exports.updateTestSuite = updateTestSuite;
const deleteTestSuite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const suite = yield models_1.TestSuite.findByPk(req.params.id);
        if (!suite) {
            return res.status(404).json({ message: 'Suite not found' });
        }
        yield suite.destroy();
        res.json({ message: 'Suite deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting suite', error: error.message });
    }
});
exports.deleteTestSuite = deleteTestSuite;
