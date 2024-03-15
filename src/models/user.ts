import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        mobile: {
            type: String,
            require: true,
        }
    },
        {timestamps:true}
);

export const UserModel =  mongoose.model("User", UserSchema);