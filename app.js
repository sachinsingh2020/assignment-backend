import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import ErrorMiddleware from './middlewares/Error.js';

config({
    path: "./config/config.env",
});

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// importing and using the routes 
import user from './routes/userRoutes.js';

app.use('/api/user', user);



app.get('/', (req, res) => {
    res.send('<h1>Server Is Working</h1>');
})

export default app;

app.use(ErrorMiddleware);