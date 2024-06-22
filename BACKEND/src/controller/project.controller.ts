import { Request, Response } from 'express';
import ProjectService from '../services/project.service';

const projectService = new ProjectService();

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = {
      project_name: req.body.project_name,
      project_description: req.body.project_description,
      start_date: req.body.start_date,
      deadline: req.body.deadline,
      status: req.body.status
    };

    await projectService.createProject(project);
    res.status(201).send({ message: 'Project created successfully' });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectId = req.params.project_id;
    console.log(projectId);
    

    await projectService.deleteProject(projectId);
    res.status(200).send({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const assignProjectToUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectId = req.params.project_id;
    const userId = req.params.user_id; // Assuming you have the user ID in the request

    await projectService.assignProjectToUser(projectId, userId);
    res.status(200).send({ message: 'Project assigned to user successfully' });
  } catch (error) {
    console.error('Error assigning project to user:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
