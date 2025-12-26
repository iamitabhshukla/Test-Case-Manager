import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Project extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public status!: string;
    public created_by!: number;
}

Project.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'projects',
});

export default Project;
