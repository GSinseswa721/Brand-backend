import { Response } from "express";

const successmessage = (res:Response, status: number, message: string, data:any): void =>{
    res.status(status).json({
        message: message,
        data: data
    });
};

export default successmessage