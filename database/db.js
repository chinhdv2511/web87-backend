import mongoose from "mongoose";

const db = {
    connect: async () => {
        await mongoose.connect('mongodb+srv://mindx_user_02:mindx_user_02@cluster0.g0ql4c9.mongodb.net/story_teller');
        // mongodb+srv://mindx_user_02:mindx_user_02@cluster0.g0ql4c9.mongodb.net/
        console.log("Connected to database");
    }
};

export default db;
