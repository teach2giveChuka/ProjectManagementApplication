import mssql from 'mssql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { login_details } from '../interfaces/user';
import { sqlConfig } from '../config/sql.config';

dotenv.config();

export class AuthService {

    async login(logins: login_details) {
        try {
            const pool = await mssql.connect(sqlConfig);
            const request = pool.request();

            request.input('email', mssql.VarChar(255), logins.user_email);
            request.input('password', mssql.VarChar(255), logins.user_password);

            const result = await request.execute('loginUser');

            // Log the database result and user input
            console.log('Database Result:', result);


            console.log('User Input:', logins);


            // If no user is found, return an error message
            if (result.recordset.length < 1) {
                return {
                    message: 'User not found'
                };
            }

            // Extract the hashed password from the user record
            const hashedPassword = result.recordset[0].password;
            console.log("usr hashed", bcrypt.hashSync(logins.user_password, 6));
            // Compare the provided password with the hashed password
            const passwordMatch = bcrypt.compareSync(logins.user_password, hashedPassword);
            const mailmatch = logins.user_email === result.recordset[0].email

            // If passwords match, generate a JWT token
            if (mailmatch) {
                console.log("mailmatch")
                const { email, ...rest } = result.recordset[0];
               

                return {
                    message: 'Login successful',
                    // token
                };
            } else {
                // If passwords don't match, return an error message
                return {
                    message: 'Incorrect password'
                };
            }
        } catch (error) {
            // Catch any errors that occur during the login process
            return {
                message: 'Server error',
                error
            };
        }
    }
}
