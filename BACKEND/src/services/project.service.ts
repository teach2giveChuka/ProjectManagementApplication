import mssql from 'mssql';
import { Project } from '../interfaces/project';
import { v4 as uuidv4 } from 'uuid';
import { sqlConfig } from '../config/sql.config';

export class ProjectService {
  async createProject(project: Project): Promise<void> {
    try {
      let pool = await mssql.connect(sqlConfig);
      const request = pool.request();
      request.input('project_id', mssql.VarChar(255), uuidv4());
      request.input('project_name', mssql.VarChar(255), project.project_name);
      request.input('project_description', mssql.VarChar(255), project.project_description);
      request.input('start_date', mssql.Date, new Date(project.start_date));
      request.input('deadline', mssql.Date, new Date(project.deadline));
      request.input('status', mssql.Bit, project.status);

      await request.execute('createProject');
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
      const pool = await mssql.connect(sqlConfig);
      const request = pool.request();

      // Input validation
      if (!projectId || !userId) {
        throw new Error('Invalid project ID or user ID');
      }

      // Input logging
      console.log('Assigning project:', projectId, 'to user:', userId);

      // Execute stored procedure
      const result = await request.input('project_id', mssql.VarChar(255), projectId)
        .input('id', mssql.VarChar(255), userId)
        .execute('assignProjectToUser');

      // Check for successful execution
      if (!result || !result.recordset || result.recordset.length === 0) {
        throw new Error('No response from database');
      }

      // Log success
      console.log('Project assigned successfully to user');
    } catch (err) {
      console.error('SQL error', err);
      throw err;
    }
  }

  async getAllProjects(): Promise<Project[]> {
    try {
      let pool = await mssql.connect(sqlConfig);
      const request = pool.request();

      const result = await request.execute('getAllProjects');
      return result.recordset as Project[];
    } catch (err) {
      console.error('SQL error', err);
      throw err;
    }
  }

  async getAllFreeUsers(): Promise<{ id: string, name: string, email: string }[]> {
    try {
      let pool = await mssql.connect(sqlConfig);
      const request = pool.request();

      const result = await request.execute('getAllFreeUsers');
      return result.recordset as { id: string, name: string, email: string }[];
    } catch (err) {
      console.error('SQL error', err);
      throw err;
    }
  }
 

}

export default ProjectService;
