export const UserView = function (user) {
    return {
        id: user.id,
        fullname: user.fullname,
        email: user.email
    };
}