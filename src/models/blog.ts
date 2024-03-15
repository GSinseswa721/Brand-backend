import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            require: true,
            unique: true,
        },
        image: {
            type: String,
            required:false,
        }
    },
        {timestamps:true}
);

export const BlogModel =  mongoose.model("Blog", BlogSchema);