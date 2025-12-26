import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password_hash!: string;
    public role!: 'admin' | 'test-lead' | 'tester' | 'read-only';

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password_hash);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'test-lead', 'tester', 'read-only'),
        defaultValue: 'tester',
    },
}, {
    sequelize,
    tableName: 'users',
    hooks: {
        beforeCreate: async (user) => {
            if (user.password_hash) {
                user.password_hash = await bcrypt.hash(user.password_hash, 10);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password_hash')) {
                user.password_hash = await bcrypt.hash(user.password_hash, 10);
            }
        },
    },
});

export default User;
