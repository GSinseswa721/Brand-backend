import { Request, Response } from 'express';
import { createMessage, getMessages, getMessage, updateMessage, deleteMessage } from '../controllers/message';
import Message from '../models/message';
import { messageSchema } from '../utils/validation';


jest.mock('../models/message', () => ({
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

jest.mock('../utils/email', () => ({
  mailer: jest.fn(),
}));

const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
} as unknown as Response;

describe('createMessage', () => {
  it('should create a new message and send an email', async () => {
    const req = { body: { name: 'Test Name', email: 'test@example.com', message: 'Test message' } } as Request;
    const expectedMessage = { _id: '123', name: 'Test Name', email: 'test@example.com', message: 'Test message' };

    (Message.create as jest.Mock).mockResolvedValue(expectedMessage);

    await createMessage(req, mockResponse);

    expect(Message.create).toHaveBeenCalledWith({ name: 'Test Name', email: 'test@example.com', message: 'Test message' });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email sent successfully' });
  });

  it('should return 400 if validation fails', async () => {
    const req = { body: { name: 'Test Name', email: 'test@example.com' } } as Request;

    const error = new Error('Validation error');
    error.message = 'Validation error';
    const value = { error };


    jest.spyOn(messageSchema, 'validate').mockReturnValue(value as any);

    await createMessage(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Validation error' });
  });

  it('should return 500 if an error occurs', async () => {
    const req = { body: { name: 'Test Name', email: 'test@example.com', message: 'Test message' } } as Request;

    (Message.create as jest.Mock).mockRejectedValue(new Error('Database error'));

    await createMessage(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);

  });

  
  describe('getMessages', () => {
    it('should return messages when found', async () => {

      const mockMessages = [{ id: 1, text: 'Message 1' }, { id: 2, text: 'Message 2' }];
      jest.mock('../yourMessageModelFilePath', () => ({
        find: jest.fn().mockResolvedValue(mockMessages),
      }));
  
      const res = new Response(); 
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMessages);
    });
  
    it('should return 404 when messages not found', async () => {
      jest.mock('../yourMessageModelFilePath', () => ({
        find: jest.fn().mockRejectedValue(new Error('Messages not found')),
      }));
  
      const res = new Response(); 
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith('The messages you are looking for are not found');
    });
  });
  
});
