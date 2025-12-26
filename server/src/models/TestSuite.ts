import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class TestSuite extends Model {
    public id!: number;
    public project_id!: number;
    public name!: string;
    public description!: string;
}

TestSuite.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
}, {
    sequelize,
    tableName: 'test_suites',
});

export default TestSuite;
