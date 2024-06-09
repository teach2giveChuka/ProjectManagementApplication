import mssql from 'mssql';
import { user } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import lodash from 'lodash';
import { sqlConfig } from '../config/sql.config';

export class userService {

    async createUser(person: user, role: string = 'user') {
        let pool = await mssql.connect(sqlConfig);

        let user_id = uuidv4();
        let hashedPassword = bcrypt.hashSync(person.user_password, 6);

        if (pool.connected) {
            let emailExists = (await pool.request().query(`SELECT * FROM Users WHERE email = '${person.user_email}'`)).recordset;

            if (!lodash.isEmpty(emailExists)) {
                return {
                    error: 'Email already exists'
                };
            }

            let result = (await pool.request()
                .input('user_id', mssql.VarChar, user_id)
                .input('user_name', mssql.VarChar, person.user_name)
                .input('user_email', mssql.VarChar, person.user_email)
                .input('user_password', mssql.VarChar, hashedPassword)
                .input('role', mssql.VarChar, role)
                .execute('registerUser')).rowsAffected;

            if (result[0] === 1) {
                return {
                    message: 'Account created successfully'
                };
            } else {
                return {
                    error: 'Error creating account'
                };
            }
        } else {
            return {
                error: 'Error establishing connection'
            };
        }
    }

    async fetchAllUsers() {
        let pool = await mssql.connect(sqlConfig);

        let result = (await pool.request().execute('getAllUsers')).recordset;

        if (result.length == 0) {
            return {
                message: 'No users found'
            };
        } else {
            return {
                users: result
            };
        }
    }
}
