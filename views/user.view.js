export const UserView = function (user) {
    return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar
    };
}