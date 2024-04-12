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
        },

        comments: [
            {
              author: String,
              comment: String,
              date: { type: Date, default: Date.now },
            },
          ],
          likes: {
            type: Number,
            default: 0
          },
          dislikes: {
            type: Number,
            default: 0
          }


    },
        {timestamps:true}
);

export const BlogModel =  mongoose.model("Blog", BlogSchema);