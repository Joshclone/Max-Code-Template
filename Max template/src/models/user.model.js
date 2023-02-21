import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },

    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },

    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 50
    },

    picturePath: {
        type: String,
        default: ""
    },

    friends: {
        type: Array,
        default: []
    },

    location: String,
    occupation: String,
    viewProfile: Number,
    impressions: Number,
}, { timestamps: true })

const User = model("User", UserSchema)

export default User;