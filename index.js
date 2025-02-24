import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { v7 } from 'uuid';

import { forgotPassword, getProfile, login, register } from './controllers/user.controller.js';
import db from './database/db.js';
import tutorialController from './controllers/tutorial.controller.js';
import { validateForgotPasswordRequest, validateLoginRequest, validateRegisterRequest } from './middlewares/user.middleware.js';
import { validateCreateStoryRequest } from './middlewares/story.middleware.js';
import { authentication } from './middlewares/auth.middleware.js';
import { createStory, getStories, getStory, uploadFile } from './controllers/story.controller.js';
import { createCollection, getCollections } from './controllers/collection.controller.js';
import { validateCreateCollectionRequest } from './middlewares/collection.middleware.js';
import { simpleResponse } from './middlewares/simpleResponse.middleware.js';

dotenv.config();

const app = express();

const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, callback) => {
        const extension = file.originalname.split('.').pop();
        const filename = v7();
        console.log(filename)
        callback(null, filename + '.' + extension);
    }
});
const upload = multer({ storage });

// kết nối đến Database
db.connect();

// hàm trung gian để backend nhận dạng request body (middleware)
// tất cả request đều chạy qua hàm trung gian (middleware) express.json()
app.use(express.json());
app.use(cors());
app.use(simpleResponse);
app.use('/public', express.static('public'));

// auth
app.post('/api/v1/auth/login', validateLoginRequest, login);
app.post('/api/v1/auth/register', validateRegisterRequest, register);
app.post('/api/v1/auth/forgot-password', validateForgotPasswordRequest, forgotPassword);
app.get('/api/v1/auth/get-profile', authentication, getProfile);

// story
app.get('/api/v1/story', authentication, getStories);
app.get('/api/v1/story/:id/detail', authentication, getStory);
app.post('/api/v1/story/create', authentication, validateCreateStoryRequest, createStory);
app.post('/api/v1/story/upload-file', authentication, upload.single('file'), uploadFile);

// collection
app.get('/api/v1/collection', authentication, getCollections);
app.post('/api/v1/collection/create', authentication, validateCreateCollectionRequest, createCollection);

app.get('/api/v1/tutorial', tutorialController.mongoTutorial);

app.listen(8000, () => {
    console.log("Hello");
    console.log("Express app started at port 8000")
});
