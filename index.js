import express from 'express';
import { forgotPassword, home, login, register } from './utils/hello.utils.js';

const app = express();

app.get("/home", home);
app.post("/register", register);
app.post("/login", login);
app.post("/forgot-password", forgotPassword);

app.listen(8000, () => {
    console.log("Hello");
    console.log("Express app started at port 8000")
});
