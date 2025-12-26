"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class TestCase extends sequelize_1.Model {
}
TestCase.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    suite_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'Functional',
    },
    priority: {
        type: sequelize_1.DataTypes.ENUM('Low', 'Medium', 'High', 'Critical'),
        defaultValue: 'Medium',
    },
    pre_conditions: {
        type: sequelize_1.DataTypes.TEXT,
    },
    post_conditions: {
        type: sequelize_1.DataTypes.TEXT,
    },
    steps: {
        type: sequelize_1.DataTypes.JSONB, // Array of { step: string, expected: string }
        defaultValue: [],
    },
    expected_result: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    sequelize: database_1.default,
    tableName: 'test_cases',
});
exports.default = TestCase;
