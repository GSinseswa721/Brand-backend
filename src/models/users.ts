import mongoose from "mongoose";

const usersSchema =  new mongoose.Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },

    role:{
        type:String,
        enum:["users", "admin"],
    },
});

export const users = mongoose.model("Users", usersSchema);