import bcrypt from 'bcrypt';
import {Request} from 'express';
import jwt from 'jsonwebtoken'


const APP_SECRET = "OUR_APP_SECRET";
export interface AuthPayLoad{
    email: string;
    password: string;
}

export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}

export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await GeneratePassword(enteredPassword, salt) === savedPassword;
}

export const GenerateSignature = (payLoad: AuthPayLoad) => {
    return jwt.sign(payLoad, APP_SECRET, { expiresIn: '1d' }); // can be modified
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        throw new Error("Error comparing passwords");
    }
};