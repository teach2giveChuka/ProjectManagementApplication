import mssql from 'mssql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { login_details } from '../interfaces/user';
import { sqlConfig } from '../config/sql.config';

export class authService {

    async login(logins: login_details) {
        let pool = await mssql.connect(sqlConfig);

        let user = (await pool.request()
            .input('user_email', logins.user_email)
            .execute('loginUser')).recordset;

        if (user.length < 1) {
            return {
                message: 'user not found'
            };
        } else {
            let hashedPassword = user[0].user_password;

            let passwordMatch = bcrypt.compareSync(logins.user_password, hashedPassword);

            if (passwordMatch) {
                let { user_id, user_name, ...rest } = user[0];

                let token = jwt.sign(rest, process.env.SECRET_KEY as string, {
                    expiresIn: '2h'
                });
                return {
                    message: 'Login successful',
                    token
                };
            } else {
                return {
                    message: 'Incorrect password'
                };
            }
        }
    }
}
