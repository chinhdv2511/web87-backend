// auth: authentication (xác thực), authorization (ủy quyền)

export const authentication = (req, res, next) => {
    console.log("Xác thực người dùng");
    next();
}