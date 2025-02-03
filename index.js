import express from 'express';
import { v7 as uuidv7, v7 } from 'uuid';

import { forgotPassword, login, register } from './controllers/user.controller.js';
import db from './database/db.js';
import tutorialController from './controllers/tutorial.controller.js';
import { validateForgotPasswordRequest, validateLoginRequest, validateRegisterRequest } from './middlewares/user.middleware.js';
import { validateCreateStoryRequest } from './middlewares/story.middleware.js';
const app = express();

// kết nối đến Database
db.connect();

// hàm trung gian để backend nhận dạng request body (middleware)
// tất cả request đều chạy qua hàm trung gian (middleware) express.json()
app.use(express.json());

app.post('/api/v1/auth/login', validateLoginRequest, login);

app.post('/api/v1/auth/register', validateRegisterRequest, register);

app.post('/api/v1/auth/forgot-password', validateForgotPasswordRequest, forgotPassword);

app.get('/api/v1/story', (req, res) => {
    return res.status(200).json({
        message: 'OK'
    });
});

app.get('/api/v1/story/:id/detail', (req, res) => {
    return res.status(200).json({
        message: 'OK'
    });
});

app.post('/api/v1/story/create', validateCreateStoryRequest, (req, res) => {
    return res.status(200).json({
        message: 'OK'
    });
});

app.get('/api/v1/tutorial', tutorialController.mongoTutorial);

app.listen(8000, () => {
    console.log("Hello");
    console.log("Express app started at port 8000")
});
