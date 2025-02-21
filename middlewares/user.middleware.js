import Joi from "joi";
import { getValidationErrorDetails } from "../utils/validation.utils.js";

export const validateLoginRequest = async (req, res, next) => {
    const loginRequest = Joi.object({
        email: Joi.string().trim().email().max(255).required(),
        password: Joi.string().trim().min(8).max(100).required()
    });

    try {
        await loginRequest.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.badRequest(getValidationErrorDetails(error));
    }
}

export const validateRegisterRequest = async (req, res, next) => {
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
        return res.badRequest(getValidationErrorDetails(error));
    }
}

export const validateForgotPasswordRequest = async (req, res, next) => {
    const forgotPasswordRequest = Joi.object({
        email: Joi.string().trim().email().max(255).required()
    });

    try {
        await forgotPasswordRequest.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.badRequest(getValidationErrorDetails(error));
    }
}