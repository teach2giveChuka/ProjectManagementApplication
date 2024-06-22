import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRouter from './router/user.router';
import projectRouter from './router/project.router';

const app = express();

// Enable CORS
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Middleware
app.use((req, res, next) => {
    console.log('Middleware hit:', req.method, req.url);
    console.log('Request URL:', req.url);
    console.log('Request Headers:', req.headers);
    next();
});

app.use(bodyParser.json());
app.use(express.json());

app.use('/user', userRouter);
app.use('/project', projectRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
