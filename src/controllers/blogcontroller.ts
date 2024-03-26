import express, { request } from "express";
import { BlogModel } from "../models/blog";

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
            const {title, content, image} = request.body;
            const blog = new BlogModel({
               title,
               content,
               image, 
            });
            await blog.save();
            return response.status(201).json({message:" Blog created", data: blog})

        } catch (error){
            return response.sendStatus(400);
        }
    }
    updateBlog = async (request: express.Request, response: express.Response) =>{
        try{
            const {id} = request.params;
            const {title, content, image} = request.body;

            const blog = await BlogModel.findById(id);
            if(blog){
                blog.title = title;
                blog.content = content;
                blog.image = blog.image;
                await blog.save();
                return response.status(200).json({message: "Blog updated", data: blog})
            }
            return response.sendStatus(400);
        }catch (error){
            return response.sendStatus(400);
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