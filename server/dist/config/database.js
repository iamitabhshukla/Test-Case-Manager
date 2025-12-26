"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = __importDefault(require("pg"));
dotenv_1.default.config();
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/testcasemgm';
const sequelize = new sequelize_1.Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false,
    dialectModule: pg_1.default
});
exports.default = sequelize;
