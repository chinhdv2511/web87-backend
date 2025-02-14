import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { forgotPassword, getProfile, login, register } from './controllers/user.controller.js';
import db from './database/db.js';
import tutorialController from './controllers/tutorial.controller.js';
import { validateForgotPasswordRequest, validateLoginRequest, validateRegisterRequest } from './middlewares/user.middleware.js';
import { validateCreateStoryRequest } from './middlewares/story.middleware.js';
import { authentication } from './middlewares/auth.middleware.js';
import { getStories } from './controllers/story.controller.js';

dotenv.config();

const app = express();

// kết nối đến Database
db.connect();

// hàm trung gian để backend nhận dạng request body (middleware)
// tất cả request đều chạy qua hàm trung gian (middleware) express.json()
app.use(express.json());
app.use(cors());

// auth
app.post('/api/v1/auth/login', validateLoginRequest, login);
app.post('/api/v1/auth/register', validateRegisterRequest, register);
app.post('/api/v1/auth/forgot-password', validateForgotPasswordRequest, forgotPassword);
app.get('/api/v1/auth/get-profile', authentication, getProfile);

// story
app.get('/api/v1/story', authentication, getStories);

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
