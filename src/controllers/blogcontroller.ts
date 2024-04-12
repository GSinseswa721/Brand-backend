import express, { request } from "express";
import { BlogModel } from "../models/blog";
import uploadFile from "../utils/cloudinary";
import { Request, Response } from 'express';
import CommentModel, { IComment } from '../models/comment';

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
            const blogId = request.params.id;
            const blog = await BlogModel.findById(blogId);
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

    
      addComment = async (request: Request, response: Response): Promise<void> => {
        try {
          const { comment, name } = request.body;
          const { id: blogId } = request.params;
    
          const blog = await BlogModel.findById(blogId);
          if (!blog) {
            response.status(404).json({ message: 'Blog not found' });
            return;
          }
    
          const newComment: IComment = new CommentModel({
            name, // Ensure 'name' is included from request body
            comment,
            blog: blog._id,
          });
    
          await newComment.save();
    
          // Add the new comment to the blog's comments array
          blog.comments.push(newComment);
          await blog.save();
    
          response.status(201).json({ message: 'Comment added to blog', data: newComment });
        } catch (error) {
          console.error(error);
          response.status(500).json({ message: 'Internal server error' });
        }
      };
    
    
      getCommentsForBlog = async (request: Request, response: Response): Promise<void> => {
        try {
          const { id: blogId } = request.params;
    
          const comments = await CommentModel.find({ blog: blogId });
          response.status(200).json({ data: comments });
        } catch (error) {
          console.error(error);
          response.status(500).json({ message: 'Internal server error' });
        }
      };
    
      updateComment = async (request: Request, response: Response): Promise<void> => {
        try {
          const { id: commentId } = request.params;
          const { comment } = request.body;
    
          const updatedComment = await CommentModel.findByIdAndUpdate(
            commentId,
            { comment },
            { new: true }
          );
    
          if (!updatedComment) {
            response.status(404).json({ message: 'Comment not found' });
            return; // Ensure to return after sending the response
          }
    
          response.status(200).json({ message: 'Comment updated', data: updatedComment });
        } catch (error) {
          console.error(error);
          response.status(500).json({ message: 'Internal server error' });
        }
      };
    
    

      deleteComment = async (request: Request, response: Response): Promise<void> => {
        try {
          const { id: commentId } = request.params;
    
          const deletedComment = await CommentModel.findByIdAndDelete(commentId);
    
          if (!deletedComment) {
            response.status(404).json({ message: 'Comment not found' });
            return; // Ensure to return after sending the response
          }
    
          // Remove the comment from the associated blog's comments array
          const blog = await BlogModel.findById(deletedComment.blog);
          if (blog) {
            blog.comments.pull(deletedComment._id);
            await blog.save();
          }
    
          response.status(200).json({ message: 'Comment deleted' });
        } catch (error) {
          console.error(error);
          response.status(500).json({ message: 'Internal server error' });
        }
      };

      likeBlog = async (request: Request, response: Response): Promise<void> => {
        try {
          const { id } = request.params;
    
          const blog = await BlogModel.findById(id);
          if (!blog) {
            response.status(404).json({ message: 'Blog not found' });
            return;
          }
    
          // Increment the likes count
          blog.likes += 1;
          await blog.save();
    
          response.status(200).json({ message: 'Like added to the blog', likes: blog.likes });
        } catch (error) {
          console.error(error);
          response.status(500).json({ message: 'Internal server error' });
        }
      };


    }
    
  

// export default new BlogController();




export default new BlogController();