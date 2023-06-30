import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    liked: {
        type: Boolean,
        default: false
    }
})

export const User = mongoose.model('User', schema);