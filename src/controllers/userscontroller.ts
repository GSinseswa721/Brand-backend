import { Express } from "express";
import { Request, Response } from "express";
import { users } from "../models/users";
import successmessage from "../utils/successmessage";
import errormessage from "../utils/errormessage";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import tokenmessage from "../utils/tokenmessage";

class UsersController {
    public static async getUsers(req: Request, res: Response): Promise<void>{
        try{
            const userscontroller = await users.find();
            if (userscontroller){
                return successmessage(
                    res,
                    200,
                    `${userscontroller} User founded successful`,
                    userscontroller
                );
            } else {
                return errormessage(res, 404, "No users found");
            }
        } catch(error){
            return errormessage(res, 500, (error as Error).message);
        };
    }

    public static async getUser(req: Request, res: Response): Promise<void>{
        try {
            const user = await users.findById(req.params.id);
            if (!user){
                return errormessage(res, 404, "User not found");
            } else {
                return successmessage(res, 200, "User found successful", user);
            }
        } catch (error){
            return errormessage(res, 500, (error as Error).message);
        }
    }

    public static async createUsers(req: Request, res: Response): Promise<void>{
        try{
            const hashpassword: string = bcrypt.hashSync(req.body.password, 10);
            const{firstname,lastname,email,password,role}=req.body
            const user = new users({firstname,lastname,email,password:hashpassword,role});
            await user.save();

            if(user){
                return successmessage(res, 200, "User created successfully!!", user);
            } else{
                return errormessage(res, 401, " User creation failed");
            }
        } catch (error){
            return errormessage(res, 500, (error as Error).message);
        }
    }

    public static async updateUser(req: Request, res: Response): Promise<void> {
        try {
          const user = await users.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          });
          if (user) {
            return successmessage(res, 200, "User updated successfully", user);
          } else {
            return errormessage(res, 404, "User not found");
          }
        } catch (error) {
          return errormessage(res, 500, (error as Error).message);
        }
      }

      public static async deleteUser(req: Request, res: Response): Promise<void> {
        try {
          const user = await users.findByIdAndDelete(req.params.id);
          if (user) {
            return successmessage(res, 200, "User deleted successfully", user);
          } else {
            return errormessage(res, 404, "User not found");
          }
        } catch (error) {
          return errormessage(res, 500, (error as Error).message);
        }
      }

      public static async deleteUsers(req: Request, res: Response): Promise<void> {
        try {
          const user = await users.deleteMany();
          if (users) {
            return successmessage(
              res,
              200,
              ` All Users deleted successfully!!`,
              null
            );
          } else {
            return errormessage(res, 404, "No users deleted");
          }
        } catch (error) {
          return errormessage(res, 500, (error as Error).message);
        }
      }


      public static async login(req: Request, res: Response): Promise<void>{
        const {email, password} = req.body;
        const secretKey = "Gogo"
        try {
            if (!secretKey){
                return errormessage(res, 500,`Secret key is not defined`);
            }
            const usersLogin:any = await users.findOne({ email });
            if(!usersLogin){
                return errormessage(res, 401, `Invalid email or password`);
            }
            const comparePassword = bcrypt.compareSync(password, usersLogin.password);
            if (!comparePassword){
                return errormessage(res, 401, `Invalid email or password`);
            }
            const token = jwt.sign({user: usersLogin}, secretKey, { expiresIn: '30d'});
            if(token){
                return tokenmessage(res, 200, `User login successful`, token);
            } else{
                return errormessage(res, 500,`Failed to generate token`);
            }
        }
        catch (error) {
            console.error("Error during login:", error);
            return errormessage(res, 500, `Internal server error`);
        }
      }
}

export default UsersController;