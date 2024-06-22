import { Request, Response } from 'express';
import { assignProject } from '../services/assignProject';
import { completeTask } from '../services/completeTask';

export const handleAssignProject = async (req: Request, res: Response) => {
    const { projectId, userId } = req.body;
    try {
        await assignProject(projectId, userId);
        res.status(200).json({ message: 'Project assigned and email sent to user.' });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning project.', error });
    }
};

export const handleCompleteTask = async (req: Request, res: Response) => {
    const { taskId, userId } = req.body;
    try {
        await completeTask(taskId, userId);
        res.status(200).json({ message: 'Task marked as completed and email sent to admin.' });
    } catch (error) {
        res.status(500).json({ message: 'Error completing task.', error });
    }
};
