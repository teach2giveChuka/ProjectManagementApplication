import { Request, Response } from 'express';
import { projectService } from '../services/project.service';
import { project } from '../interfaces/project';

const projectServiceInstance = new projectService();

export const createProject = async (req: Request, res: Response) => {
    const { project_id, project_name, project_start_date, project_deadline, project_status } = req.body;

    try {
        const newProject: project = { project_id, project_name, project_start_date, project_deadline, project_status };

        const result = await projectServiceInstance.createProject(newProject);

        if (result.message === 'Project created successfully') {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const assignProjectToUser = async (req: Request, res: Response) => {
    const { project_id, user_id } = req.body;

    try {
        const result = await projectServiceInstance.assignProjectToUser(project_id, user_id);

        if (result.message === 'Project assigned to user successfully') {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    const { project_id } = req.params;

    try {
        const result = await projectServiceInstance.deleteProject(project_id);

        if (result.message === 'Project deleted successfully') {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
