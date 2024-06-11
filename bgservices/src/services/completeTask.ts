import mssql from 'mssql';
import dotenv from 'dotenv';
import path from 'path';
import ejs from 'ejs';
dotenv.config();

import { sqlConfig } from '../config/sqlConfig';
import { sendMail } from '../helpers/emailHelpers';

export const completeTask = async (taskId: number, userId: number) => {
    const pool = await mssql.connect(sqlConfig);

    const userQuery = await pool.request().query(`SELECT * FROM Users WHERE id = ${userId}`);
    const user = userQuery.recordset[0];

    const taskQuery = await pool.request().query(`SELECT * FROM Projects WHERE project_id = ${taskId}`);
    const task = taskQuery.recordset[0];

    const isAssigned = (await pool.request().query('SELECT * FROM Projects WHERE isAssigned = 1')).recordset
    console.log(isAssigned);
    

    const templatePath = path.resolve(__dirname, '../../templates/completeTask.ejs');

    ejs.renderFile(templatePath, { UserName: user.name, TaskName: task.name, isAssigned }, async (error, data) => {
        if (error) {
            console.log(error);
            return;
        }

        let mailOptions = {
            from: process.env.EMAIL as string,
            to: process.env.ADMIN_EMAIL as string,
            subject: "Task Completed",
            html: data
        };

        try {
            await sendMail(mailOptions);
            console.log("Email sent to admin for task completion");

            await pool.request().query('UPDATE Projects SET isAssigned = 0 WHERE isAssigned = 1')
        } catch (error) {
            console.log(error);
        }
    });
};
