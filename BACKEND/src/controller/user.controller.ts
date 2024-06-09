import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { user } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';

const userServiceInstance = new userService();

export const registerUser = async (req: Request, res: Response) => {
    console.log('Request Body:', req.body);
    const user_id = uuidv4();
    const { user_name, user_email, user_password } = req.body;

    try {
        const newUser: user = { user_id, user_name, user_email, user_password };
        console.log('New User Object:', newUser);

        const result = await userServiceInstance.createUser(newUser);

        if (result.error) {
            res.status(400).json(result);
        } else {
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server isnt getting data', error });
    }
};

export const registerAdmin = async (req: Request, res: Response) => {
    console.log('Request Body:', req.body);
    const { user_id,user_name, user_email, user_password } = req.body;
    const role = 'admin';

    try {
        const newUser: user = { user_id,user_name, user_email, user_password };

        const result = await userServiceInstance.createUser(newUser, role);

        if (result.error) {
            res.status(400).json(result);
        } else {
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
