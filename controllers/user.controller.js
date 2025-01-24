import { v7 } from 'uuid';

import User from "../models/user.model.js";
import userRepository from '../repositories/user.repository.js';
import { UserView } from '../views/user.view.js';

export const register = async (req, res) => {
    const { fullname, email, password } = req.body;

    // kiểm tra người dùng với email
    const foundUserWithEmail = await userRepository.getUserByEmail(email);
    if (foundUserWithEmail) {
        return res.status(400).json({
            message: 'The email has already been taken by another user'
        });
    }

    const newUser = await userRepository.createUser({ fullname, email, password });

    const userView = new UserView(newUser);

    return res.status(200).json({
        message: "Register successfully",
        data: userView
    });
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userRepository.getUserByEmailAndPassword(email, password);

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