import { Response } from "express";

const errormessage = (res: Response, status: number, message: string): void => {
    res.status(status).json({
        message: message,
    });
};

export default errormessage;