import User from "../models/user.model.js";

const userRepository = {

    getUserById: (id) => {

    },

    getUserByEmail: async (email) => {
        const user = await User.findOne({ email });
        return user;
    },

    getUserByEmailAndPassword: async (email, password) => {
        const user = await User.findOne({ email, password });
        return user;
    },

    createUser: async (data) => {
        const newUser = new User();
        newUser.fullName = data.fullname;
        newUser.email = data.email;
        newUser.password = data.password;
        newUser.registrationDate = new Date();

        await newUser.save();

        return newUser;
    },


};

export default userRepository;