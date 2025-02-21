import Joi from "joi";
import { getValidationErrorDetails } from "../utils/validation.utils.js";

export const validateCreateStoryRequest = async (req, res, next) => {
    const createStoryRequest = Joi.object({
        title: Joi.string().trim().max(255).required(),
        content: Joi.string().trim().max(100000).required(),
        collectionId: Joi.string().max(255),
    });

    try {
        await createStoryRequest.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Invalid data",
            errors: getValidationErrorDetails(error)
        })
    }
}