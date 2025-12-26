"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProject = exports.getProjects = void 0;
const models_1 = require("../models");
// Get all projects
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield models_1.Project.findAll({
            include: [{ model: models_1.User, attributes: ['id', 'username'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error: error.message });
    }
});
exports.getProjects = getProjects;
// Get single project
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield models_1.Project.findByPk(req.params.id, {
            include: [{ model: models_1.User, attributes: ['id', 'username'] }]
        });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching project', error: error.message });
    }
});
exports.getProject = getProject;
// Create project
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, status } = req.body;
        // AuthRequest guarantees user exists if authenticate middleware is passed
        const project = yield models_1.Project.create({
            name,
            description,
            status,
            created_by: req.user.id
        });
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating project', error: error.message });
    }
});
exports.createProject = createProject;
// Update project
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield models_1.Project.findByPk(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const { name, description, status } = req.body;
        yield project.update({ name, description, status });
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating project', error: error.message });
    }
});
exports.updateProject = updateProject;
// Delete project
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield models_1.Project.findByPk(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        yield project.destroy();
        res.json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting project', error: error.message });
    }
});
exports.deleteProject = deleteProject;
