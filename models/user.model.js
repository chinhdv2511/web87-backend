import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    avatar: String,
    registrationDate: Date
});

const User = mongoose.model('users', UserSchema);
export default User;