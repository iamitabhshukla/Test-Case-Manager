import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class TestExecution extends Model {
    public id!: number;
    public test_case_id!: number;
    public user_id!: number;
    public status!: 'Pass' | 'Fail' | 'Blocked' | 'Skipped';
    public result!: string; // Details/Comments
    public comments!: string;
}

TestExecution.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    test_case_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pass', 'Fail', 'Blocked', 'Skipped'),
        allowNull: false,
    },
    result: {
        type: DataTypes.TEXT,
    },
    comments: {
        type: DataTypes.TEXT,
    },
}, {
    sequelize,
    tableName: 'test_executions',
});

export default TestExecution;
