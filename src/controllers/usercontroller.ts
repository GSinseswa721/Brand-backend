import express, { request } from "express";
import { UserModel } from "../models/user";
import { signToken } from "../utils/authentication";
import { GeneratePassword, GenerateSalt, comparePassword } from "../utils/password";


class UserController {

    getAllUser = async (request: express.Request, response: express.Response) => {
        try {
            const users = await UserModel.find();
            return response.status(200).json({ data: users })

        } catch (error) {
            return response.sendStatus(400);
        }
    }

    getUser = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
            const user = await UserModel.findById(id);
            return response.status(200).json({ data: user })

        } catch (error) {
            return response.sendStatus(400);
        }
    }

    createUser = async (request: express.Request, response: express.Response) => {
        try {
            const { name, email, password } = request.body;
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return response.json({ "Message": "User already exists" });
            }

            // Generate salt
            const salt = await GenerateSalt();
            const userPassword = await GeneratePassword(password, salt);

            const user = new UserModel({
                name,
                email,
                password:userPassword,
            });
            await user.save();
            return response.status(201).json({ message: " User created", data: user })

        } catch (error) {
            return response.sendStatus(400);
        }
    }
    updateUser = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
            const { name, email } = request.body;

            const user = await UserModel.findById(id);
            if (user) {
                user.name = name;
                user.email = email;

                await user.save();
                return response.status(200).json({ message: "User updated", data: user })
            }
            return response.sendStatus(400);
        } catch (error) {
            return response.sendStatus(400);
        }
    }

    DeleteUser = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
            await UserModel.findByIdAndDelete({ _id: id });
            return response.status(200).json({ message: "User deleted" })

        } catch (error) {
            return response.sendStatus(400);
        }
    }

    SignIn = async (request: express.Request, response: express.Response) => {
        try {
            const { password, email } = request.body;
            const user: any = await UserModel.findOne({
                email
            });

            if (!user) {
                return response.status(404).json({ message: "user not found" });
            }
            console.log("'****************************")
            console.log(user)
            console.log("'****************************")    
            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return response.status(401).json({ message: "Incorrect password" });
            }
            const { name } = user
            return response.status(201).json({ message: " User created", token: signToken({ email, name }) })

        } catch (error) {
            return response.sendStatus(400);
        }
    }

}
export default new UserController();