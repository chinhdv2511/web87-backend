import { v7 } from 'uuid';
import bcrypt from 'bcrypt';

import User from "../models/user.model.js";
import userRepository from '../repositories/user.repository.js';
import { UserView } from '../views/user.view.js';

export const register = async (req, res) => {
    const { fullName, email, password } = req.body;

    // kiểm tra người dùng với email
    const foundUserWithEmail = await userRepository.getUserByEmail(email);
    if (foundUserWithEmail) {
        return res.status(400).json({
            message: 'The email has already been taken by another user'
        });
    }

    // mã hóa mật khẩu (hash password)
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await userRepository.createUser({ fullName, email, password: hashedPassword, salt });

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

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await userRepository.getUserByEmail(email);

    if (user) {
        // todo: generate random password
        const password = "User@1234";
        const hashedPassword = bcrypt.hashSync(password, user.salt);

        user.password = hashedPassword;
        user.save();

        // todo: send email
        return res.status(200).json({
            message: "A reset password mail has been sent to your email."
        });
    }

    return res.status(404).json({
        message: "Email was not found"
    });
}