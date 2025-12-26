"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestExecution = exports.TestCase = exports.TestSuite = exports.Project = exports.User = void 0;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Project_1 = __importDefault(require("./Project"));
exports.Project = Project_1.default;
const TestSuite_1 = __importDefault(require("./TestSuite"));
exports.TestSuite = TestSuite_1.default;
const TestCase_1 = __importDefault(require("./TestCase"));
exports.TestCase = TestCase_1.default;
const TestExecution_1 = __importDefault(require("./TestExecution"));
exports.TestExecution = TestExecution_1.default;
// Relationships
// Project - User (Creator)
User_1.default.hasMany(Project_1.default, { foreignKey: 'created_by' });
Project_1.default.belongsTo(User_1.default, { foreignKey: 'created_by' });
// Project - TestSuite
Project_1.default.hasMany(TestSuite_1.default, { foreignKey: 'project_id', onDelete: 'CASCADE' });
TestSuite_1.default.belongsTo(Project_1.default, { foreignKey: 'project_id' });
// TestSuite - TestCase
TestSuite_1.default.hasMany(TestCase_1.default, { foreignKey: 'suite_id', onDelete: 'SET NULL' });
TestCase_1.default.belongsTo(TestSuite_1.default, { foreignKey: 'suite_id' });
// TestCase - TestExecution
TestCase_1.default.hasMany(TestExecution_1.default, { foreignKey: 'test_case_id', onDelete: 'CASCADE' });
TestExecution_1.default.belongsTo(TestCase_1.default, { foreignKey: 'test_case_id' });
// User - TestExecution (Tester)
User_1.default.hasMany(TestExecution_1.default, { foreignKey: 'user_id' });
TestExecution_1.default.belongsTo(User_1.default, { foreignKey: 'user_id' });
