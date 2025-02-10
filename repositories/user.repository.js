import User from "../models/user.model.js";

const userRepository = {

    getUserById: async (id) => {
        const user = await User.findById(id);
        return user;
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
        newUser.fullName = data.fullName;
        newUser.email = data.email;
        newUser.password = data.password;
        newUser.registrationDate = new Date();
        newUser.salt = data.salt;

        await newUser.save();

        return newUser;
    },


};

export default userRepository;