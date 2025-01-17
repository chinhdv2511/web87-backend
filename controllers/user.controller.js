import { v7 } from 'uuid';

import User from "../models/user.model.js";
import { createUser, getUserByEmailAndPassword } from '../repositories/user.repository.js';
import { UserView } from '../views/user.view.js';

export const register = (req, res) => {
    const { fullname, email, password } = req.body;

    const newUser = new User(v7(), fullname, email, password);
    createUser(newUser);

    const userView = new UserView(newUser);

    return res.status(200).json({
        message: "Register successfully",
        data: userView
    });
}

export const login = (req, res) => {
    const { email, password } = req.body;

    const user = getUserByEmailAndPassword(email, password);

    if (user) {
        const userView = new UserView(user);
        return res.status(200).json({
            message: "Login successfully",
            data: userView
        });
    }

    return res.status(401).json({
        message: "Email or password is incorrect"
    });
}