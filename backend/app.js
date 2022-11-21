import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './src/routes/index.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

export default app;