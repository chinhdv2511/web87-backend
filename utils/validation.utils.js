export const getValidationErrorDetails = (error) => {
    return error.details.map(item => {
        return {
            message: item.message,
            path: item.path.join(".")
        };
    });
}