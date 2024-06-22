import mssql from 'mssql';
import { Project } from '../interfaces/project';
import { v4 as uuidv4 } from 'uuid';
import { sqlConfig } from '../config/sql.config';

export class ProjectService {
  async createProject(project: Project): Promise<void> {
    try {
      let pool = await mssql.connect(sqlConfig);
      let project_id = uuidv4();
      const request = pool.request();
      request.input('project_id', project_id);
      request.input('project_name', mssql.VarChar(255), project.project_name);
      request.input('project_description', mssql.VarChar(255), project.project_description);
      request.input('start_date', mssql.Date, new Date(project.start_date));
      request.input('deadline', mssql.Date, new Date(project.deadline));
      request.input('status', mssql.Bit, project.status);

      await request.execute('createProject');
      console.log(project_id);
      
    } catch (err) {
      console.error('SQL error', err);
      throw err;
    }
  }

  async deleteProject(projectId: string): Promise<void> {
    try {
      let pool = await mssql.connect(sqlConfig);
      const request = pool.request();
      request.input('project_id', mssql.VarChar(255), projectId);


      await request.execute('deleteProject');
    } catch (err) {
      console.error('SQL error', err);
      throw err;
    }
  }

  async assignProjectToUser(projectId: string, userId: string): Promise<void> {
    try {
      let pool = await mssql.connect(sqlConfig);
      const request = pool.request();
      request.input('project_id', mssql.VarChar(255), projectId);
      request.input('id', mssql.VarChar(255), userId);

      console.log("user input", userId, projectId)

      await request.execute('assignProjectToUser');
    } catch (err) {
      console.error('SQL error', err);
      throw err;
    }
  }

}

export default ProjectService;
