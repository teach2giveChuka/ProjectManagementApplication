import mssql from 'mssql';
import dotenv from 'dotenv';
import path from 'path';
import ejs from 'ejs';
dotenv.config();

import { sqlConfig } from '../config/sqlConfig';
import { sendMail } from '../helpers/emailHelpers';

export const assignProject = async (projectId: number, userId: number) => {
    const pool = await mssql.connect(sqlConfig);

    const userQuery = await pool.request().query(`SELECT * FROM Users WHERE id = ${userId}`);
    const user = userQuery.recordset[0];

    const projectQuery = await pool.request().query(`SELECT * FROM Projects WHERE id = ${projectId}`);
    const project = projectQuery.recordset[0];

    const isAssigned = (await pool.request().query('SELECT * FROM Projects WHERE isAssigned = 0')).recordset
    console.log(isAssigned);
    

    const templatePath = path.resolve(__dirname, '../../templates/assignProject.ejs');

    ejs.renderFile(templatePath, { UserName: user.name, ProjectName: project.name, isAssigned }, async (error, data) => {
        if (error) {
            console.log(error);
            return;
        }

        let mailOptions = {
            from: process.env.EMAIL as string,
            to: user.email,
            subject: "New Project Assigned",
            html: data
        };

        try {
            await sendMail(mailOptions);
            console.log("Email sent to user for project assignment");

            await pool.request().query('UPDATE Projects SET isAssigned = 1 WHERE isAssigned = 0')
        } catch (error) {
            console.log(error);
        }
    });
};
