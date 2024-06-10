import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { login_details } from '../interfaces/user';

const authServiceInstance = new AuthService();

export const loginUser = async (req: Request, res: Response) => {
    const { user_email, user_password } = req.body;

    try {
        const logins: login_details = { user_email, user_password };

        const result = await authServiceInstance.login(logins);

        if (!result.error) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
