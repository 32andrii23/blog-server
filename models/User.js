import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    activationLink: {
        type: String,
    },
    profilePictureUrl: {
        type: String,
    },
}, {
    timestamps: true,
},
);

export default model("User", UserSchema);