import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        const secretKey = process.env.JWT_SECRET_KEY;
        const accessTokenExpires = process.env.JWT_ACCESS_TOKEN_EXPIRES;
        const refreshTokenExpires = process.env.JWT_REFRESH_TOKEN_EXPIRES;

        const accessTokenPayload = {
            userId: user.id,
            fullName: user.fullName
        };
        const accessToken = jwt.sign(accessTokenPayload, secretKey, { expiresIn: accessTokenExpires });

        const refreshTokenPayload = {
            userId: user.id
        }
        const refreshToken = jwt.sign(refreshTokenPayload, secretKey, { expiresIn: refreshTokenExpires });

        return res.ok({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            avatar: user.avatar,
            accessToken,
            refreshToken
        }, "Login successfully");
    }

    return res.unauthorized("Fail to logged in", "Email or password is incorrect");
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

export const getProfile = async (req, res) => {
    const currentUserId = req.currentUserId;

    const user = await userRepository.getUserById(currentUserId);

    return res.ok(UserView(user));
}