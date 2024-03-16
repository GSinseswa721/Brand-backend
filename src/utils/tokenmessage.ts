import { Response } from "express";

const tokenmessage = (res: Response, status: number, message: string, token:String): void =>{
    res.status(status).json({
        message: message,
      token:token,
    });
};

export default tokenmessage;