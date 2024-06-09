import mssql from 'mssql';
import lodash from 'lodash';
import { project } from '../interfaces/project';
import { v4 as uuidv4 } from 'uuid';
import { sqlConfig } from '../config/sql.config';

export class projectService {

    async createProject(task: project) {
        let pool = await mssql.connect(sqlConfig);
        let projectId = uuidv4();

        let result = await (await pool.request()
            .input('project_id', projectId)
            .input('project_name', task.project_name)
            .input('project_start_date', task.project_start_date)
            .input('project_deadline', task.project_deadline)
            .input('project_status', task.project_status)
            .execute('createProject')).rowsAffected;

        if (result[0] === 1) {
            return {
                message: 'Project created successfully'
            };
        } else {
            return {
                message: 'Error creating project'
            };
        }
    }

    async assignProjectToUser(projectId: string, userId: string) {
        let pool = await mssql.connect(sqlConfig);

        let userHasProject = await pool.request()
            .input('user_id', userId)
            .execute('getUserProjects');

        if (!lodash.isEmpty(userHasProject.recordset)) {
            return {
                error: 'User already has a project assigned'
            };
        }

        let result = await (await pool.request()
            .input('project_id', projectId)
            .input('user_id', userId)
            .execute('assignProjectToUser')).rowsAffected;

        if (result[0] === 1) {
            return {
                message: 'Project assigned to user successfully'
            };
        } else {
            return {
                message: 'Error assigning project to user'
            };
        }
    }

    async deleteProject(projectId: string) {
        let pool = await mssql.connect(sqlConfig);

        let result = await (await pool.request()
            .input('project_id', projectId)
            .execute('deleteProject')).rowsAffected;

        if (result[0] === 1) {
            return {
                message: 'Project deleted successfully'
            };
        } else {
            return {
                message: 'Error deleting project'
            };
        }
    }
}
