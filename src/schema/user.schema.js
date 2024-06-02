import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['Doctor', 'Patient'],
        required: true
    },
    password: String
})

export const UserModel = mongoose.model('User', userSchema);