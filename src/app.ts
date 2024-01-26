import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './middleware/notFound';
import globalErrorHandle from './middleware/globalErrorHandle';
import router from './router';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to Fullstack's Assignment 1 | Redux ");
});

app.use(globalErrorHandle)
app.use(notFound)


export default app;