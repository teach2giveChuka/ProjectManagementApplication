import { Router } from 'express';
import { handleAssignProject, handleCompleteTask } from '../controllers/projectController';

const router = Router();

router.post('/assign', handleAssignProject);
router.post('/complete', handleCompleteTask);

export default router;
