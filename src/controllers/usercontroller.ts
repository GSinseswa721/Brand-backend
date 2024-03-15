import express, { request } from "express";
import { UserModel } from "../models/user";

class UserController{

    getAllUser = async (request: express.Request, response: express.Response)=>{
        try {
            const users = await UserModel.find();
            return response.status(200).json({data: users})

        } catch (error){
            return response.sendStatus(400);
        }
    }

    getUser = async (request: express.Request, response: express.Response) => {
        try {
            const {id} = request.params;
            const user = await UserModel.findById(id);
            return response.status(200).json({data: user})

        } catch (error){
            return response.sendStatus(400);
        }
    }

    createUser = async (request: express.Request, response: express.Response) => {
        try {
            const {name, email, mobile} = request.body;
            const user = new UserModel({
               name,
               email,
               mobile, 
            });
            await user.save();
            return response.status(201).json({message:" User created", data: user})

        } catch (error){
            return response.sendStatus(400);
        }
    }
    updateUser = async (request: express.Request, response: express.Response) =>{
        try{
            const {id} = request.params;
            const {name, email, mobile} = request.body;

            const user = await UserModel.findById(id);
            if(user){
                user.name = name;
                user.email = email;
                user.mobile = mobile;
                await user.save();
                return response.status(200).json({message: "User updated", data: user})
            }
            return response.sendStatus(400);
        }catch (error){
            return response.sendStatus(400);
        }
    }

    DeleteUser = async (request: express.Request, response: express.Response) =>{
        try {
            const {id} = request.params;
            await UserModel.findByIdAndDelete({_id:id});
            return response.status(200).json({message: "User deleted"})

        } catch (error){
            return response.sendStatus(400);
        }
    }
}
export default new UserController();