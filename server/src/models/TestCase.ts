import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class TestCase extends Model {
    public id!: number;
    public suite_id!: number; // Can be null if not in a suite? Usually yes.
    public title!: string;
    public description!: string;
    public type!: string;
    public priority!: 'Low' | 'Medium' | 'High' | 'Critical';
    public pre_conditions!: string;
    public post_conditions!: string;
    public steps!: any; // JSONB
    public expected_result!: string;
}

TestCase.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    suite_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: 'Functional',
    },
    priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High', 'Critical'),
        defaultValue: 'Medium',
    },
    pre_conditions: {
        type: DataTypes.TEXT,
    },
    post_conditions: {
        type: DataTypes.TEXT,
    },
    steps: {
        type: DataTypes.JSONB, // Array of { step: string, expected: string }
        defaultValue: [],
    },
    expected_result: {
        type: DataTypes.TEXT,
    },
}, {
    sequelize,
    tableName: 'test_cases',
});

export default TestCase;
