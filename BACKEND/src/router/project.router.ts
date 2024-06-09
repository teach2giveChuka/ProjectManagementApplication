import express from 'express';
import { assignProjectToUser, createProject, deleteProject } from '../controller/project.controller';
import { admin, protect } from '../middleware/auth.middleware';

const project_router = express.Router();

project_router.post('/create', protect, admin, createProject);
project_router.post('/assign', protect, admin, assignProjectToUser);
project_router.delete('/:project_id', protect, admin, deleteProject);

export default project_router;
