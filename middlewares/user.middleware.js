import Joi from "joi";
import { getValidationErrorDetails } from "../utils/validation.utils.js";

export const validateLoginRequest = (req, res, next) => {
    console.log("Kiểm tra dữ liệu tại chức năng đăng nhập");
    next();
}

export const validateRegisterRequest = async (req, res, next) => {
    console.log("Kiểm tra dữ liệu tại chức năng đăng ký");

    const registerRequest = Joi.object({
        email: Joi.string().trim().email().max(255).required(),
        password: Joi.string().trim().min(8).max(100).required(),
        fullName: Joi.string().trim().max(255).required(),
        description: Joi.string().trim().max(1000),
        avatar: Joi.string().trim().uri().max(1000)
    });

    try {
        await registerRequest.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Invalid data",
            errors: getValidationErrorDetails(error)
        });
    }
}

export const validateForgotPasswordRequest = async (req, res, next) => {
    console.log("Kiểm tra dữ liệu tại chức quên mật khẩu");

    const forgotPasswordRequest = Joi.object({
        email: Joi.string().trim().email().max(255).required()
    });

    try {
        await forgotPasswordRequest.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Invalid data",
            errors: getValidationErrorDetails(error)
        });
    }
}