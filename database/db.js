import mongoose from "mongoose";

const db = {
    connect: async () => {
        const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

        await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log("Connected to database");
    }
};

export default db;
