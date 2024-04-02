import { Request, Response } from 'express';

import Message from '../models/message';
import { mailer } from '../utils/email';
import { messageSchema } from '../utils/validation';

const createMessage = async (req: Request, res: Response) => {
    try {
        const { error, value } = messageSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
        const { name, email , message} = value;
        const messages = await Message.create({
            name,
            email,
            message
        });
        await mailer(email, message);
        return res.status(201).json({
            message: "Email sent successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const getMessages = async (req: Request, res: Response)=> {
    try {
        const Messages= await Message.find();
        res.status(200).json(Messages);
    } catch (error) {
        res.status(404).json('The messages you are looking for are not found');
    }
};

const getMessage = async (req: Request, res: Response)=>{
    try {
        const message= await Message.findById(req.params.id);
        if (message) {
            res.status(200).json(message);
        } else {
            res.status(404).json('Message does not exist');
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateMessage = async (req: Request, res: Response)=>{
    try {
        const message= await Message.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        if (message) {
            res.status(201).json(Message);
        } else {
            res.status(404).json('Data was not updated');
        }
    } catch (error) {
        res.status(400).json('Data was not updated');
    }
};

const deleteMessage = async (req: Request, res: Response)=>{
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).json('Message deleted successfully');
    } catch (error) {
        res.status(404).json('Message not found');
    }
};

export  {createMessage,getMessages,getMessage,updateMessage,deleteMessage}