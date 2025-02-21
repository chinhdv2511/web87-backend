import Joi from "joi"
import { getValidationErrorDetails } from "../utils/validation.utils.js";

export const validateCreateCollectionRequest = async (req, res, next) => {

    const createCollectionRequest = Joi.object({
        title: Joi.string().trim().max(255).required(),
        description: Joi.string().trim().max(1000)
    });

    try {
        await createCollectionRequest.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Invalid data",
            errors: getValidationErrorDetails(error)
        })
    }
}