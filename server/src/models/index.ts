import User from './User';
import Project from './Project';
import TestSuite from './TestSuite';
import TestCase from './TestCase';
import TestExecution from './TestExecution';

// Relationships

// Project - User (Creator)
User.hasMany(Project, { foreignKey: 'created_by' });
Project.belongsTo(User, { foreignKey: 'created_by' });

// Project - TestSuite
Project.hasMany(TestSuite, { foreignKey: 'project_id', onDelete: 'CASCADE' });
TestSuite.belongsTo(Project, { foreignKey: 'project_id' });

// TestSuite - TestCase
TestSuite.hasMany(TestCase, { foreignKey: 'suite_id', onDelete: 'SET NULL' });
TestCase.belongsTo(TestSuite, { foreignKey: 'suite_id' });

// TestCase - TestExecution
TestCase.hasMany(TestExecution, { foreignKey: 'test_case_id', onDelete: 'CASCADE' });
TestExecution.belongsTo(TestCase, { foreignKey: 'test_case_id' });

// User - TestExecution (Tester)
User.hasMany(TestExecution, { foreignKey: 'user_id' });
TestExecution.belongsTo(User, { foreignKey: 'user_id' });

export {
    User,
    Project,
    TestSuite,
    TestCase,
    TestExecution
};
