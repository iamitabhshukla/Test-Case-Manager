import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/testcasemgm';

const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false,
    dialectModule: pg
});

export default sequelize;
