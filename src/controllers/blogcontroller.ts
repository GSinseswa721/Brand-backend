import express, { request } from "express";
import { BlogModel } from "../models/blog";
import uploadFile from "../utils/cloudinary";

class BlogController{

    getAllBlog = async (request: express.Request, response: express.Response)=>{
        try {
            const blogs = await BlogModel.find();
            return response.status(200).json({data: blogs})

        } catch (error){
            return response.sendStatus(400);
        }
    }

    getBlog = async (request: express.Request, response: express.Response) => {
        try {
            const {id} = request.params;
            const blog = await BlogModel.findById(id);
            return response.status(200).json({data: blog})

        } catch (error){
            return response.sendStatus(400);
        }
    }

    createBlog = async (request: express.Request, response: express.Response) => {
        try {
            const {title, content} = request.body;
            if (!request.file) {
                return response.status(400).json({ message: 'No file uploaded' });
            }
            const image:any = await uploadFile(request.file,response)
            console.log(image);
            const blog = new BlogModel({
               title,
               content,
               image:image.secure_url, 
            });
            await blog.save();
            return response.status(201).json({message:" Blog created", data: blog})

        } catch (error){
            return response.sendStatus(400);
        }
    } 
    updateBlog = async (request: express.Request, response: express.Response) =>{
            const {id} = request.params;
            const {title, content, image} = request.body;

            const blog = await BlogModel.findById({_id:id});
            if (!blog) {
                return response.status(404).json({ message: "No Blog Found" });
            }
            try{
                if (title) blog.title = title;
                if (content) blog.content = content;
                if (request.file) {
                    const blogImage: any = await uploadFile(request.file, response);
                    blog.image = blogImage.secure_url;
                }
                const updatedBlog = await BlogModel.findByIdAndUpdate({ _id:id },blog, { new: true })
                return response.status(200).json({message: "Blog updated", data: updatedBlog})
            
            //return response.sendStatus(400);
        } catch (error) {
            console.log(error)
            return response.status(500).json({ "Message": "Internal server error" });
          
        }
    }

    deleteBlog = async (request: express.Request, response: express.Response) =>{
        try {
            const {id} = request.params;
            await BlogModel.findByIdAndDelete({_id:id});
            return response.status(200).json({message: "Blog deleted"})

        } catch (error){
            return response.sendStatus(400);
        }
    }
}
export default new BlogController();