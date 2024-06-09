import express from 'express';
import { registerAdmin, registerUser } from '../controller/user.controller';
import { loginUser } from '../controller/auth.controller';

const user_router = express.Router();

user_router.post('/register', registerUser);
user_router.post('/register-admin', registerAdmin);
user_router.post('/login', loginUser);

export default user_router;
