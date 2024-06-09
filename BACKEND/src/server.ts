import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import user_router from './router/user.router';
import project_router from './router/project.router';

const app = express();

// Middleware

app.use((req, res, next) => {
    console.log('Middleware hit:', req.method, req.url);
    console.log('Request URL:', req.url);
    console.log('Request Headers:', req.headers);
    next();
});

app.use(bodyParser.json());
app.use(express.json());

app.use('/user', user_router);
app.use('/project', project_router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: err.message
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
