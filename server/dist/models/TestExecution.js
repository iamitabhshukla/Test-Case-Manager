"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class TestExecution extends sequelize_1.Model {
}
TestExecution.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    test_case_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Pass', 'Fail', 'Blocked', 'Skipped'),
        allowNull: false,
    },
    result: {
        type: sequelize_1.DataTypes.TEXT,
    },
    comments: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    sequelize: database_1.default,
    tableName: 'test_executions',
});
exports.default = TestExecution;
