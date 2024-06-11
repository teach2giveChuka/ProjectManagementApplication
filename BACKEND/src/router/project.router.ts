import express from 'express';
import { assignProjectToUser, createProject, deleteProject, getAllProjects, getAllFreeUsers } from '../controller/project.controller';
import { admin, protect } from '../middleware/auth.middleware';

const project_router = express.Router();

project_router.post('/create',protect, admin, createProject);
project_router.post('/assign', protect, admin,assignProjectToUser);
project_router.get('/projects',protect, admin,getAllProjects);
project_router.get('/free-users', protect, admin,getAllFreeUsers);
project_router.delete('/delete/:project_id', deleteProject);

export default project_router;

