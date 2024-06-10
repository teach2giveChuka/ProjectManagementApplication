import express from 'express';
import { registerAdmin, registerUser, getAllUsers } from '../controller/user.controller';
import { loginUser } from '../controller/auth.controller';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/register-admin', registerAdmin);
userRouter.post('/login', loginUser);
userRouter.get('/all', getAllUsers);

export default userRouter;
