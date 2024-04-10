import express, { request } from "express";
import { UserModel } from "../models/user";
import { signToken } from "../utils/authentication";
import { GeneratePassword, GenerateSalt, comparePassword } from "../utils/password";
import { Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';


class UserController {
    getUserById(arg0: string, isAuthenticated: (req: express.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: express.Response<any, Record<string, any>>, next: express.NextFunction) => Promise<void | express.Response<any, Record<string, any>>>, getUserById: any) {
        throw new Error("Method not implemented.");
    }

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
            return response.status(201).json({ message: " User signed in", token: signToken({ email, name }) })

        } catch (error) {
            return response.sendStatus(400);
        }
    }

    
}


export const mailer = async (req: Request, res: Response) => {
    const { from, subject, message } = req.body
  
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'glorianiyonkurusinseswa@gmail.com',
        pass: 'nxqo cfsa podu yqak',
      },
    });
  
  
    const sendinfo:nodemailer.SendMailOptions = {
      to: 'glorianiyonkurusinseswa@gmail.com',
      subject: subject,
      html: `<div><code>from: ${from}</code><b>${message}</b><div>`,
    };
  
    try {
      const sendMail = await transporter.sendMail(sendinfo);
  
      res.status(200).json({ message: 'Message sent successfully' });
    } catch (error: any) {
      console.log(error.message);
      res.status(200).json({ message: 'Something went wrong while sending mail' });
  
    }
  }
export default new UserController();