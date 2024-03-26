import { Request, Response } from 'express';
import UserController from '../controllers/usercontroller';
import { UserModel } from '../models/user';
import { GeneratePassword, GenerateSalt } from '../utils/password';
import { comparePassword } from '../utils/password';
import { signToken } from '../utils/authentication';

jest.mock('../models/user');
jest.mock('../utils/password');
jest.mock('../utils/authentication');
jest.mock('../models/user');

describe('UserController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAllUser - should return all users', async () => {
    const users = [{ name: 'User 1' }, { name: 'User 2' }];
    (UserModel as any).find.mockResolvedValue(users); 

    await UserController.getAllUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: users });
  });


});

describe('UserController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const name = 'Test User';
      const email = 'test@example.com';
      const password = 'password';
      const salt = 'mockedSalt';
      const hashedPassword = 'hashedPassword';


      (UserModel as any).findOne.mockResolvedValue(null);

      (GenerateSalt as jest.Mock).mockResolvedValue(salt);
      (GeneratePassword as jest.Mock).mockResolvedValue(hashedPassword);

      req.body = { name, email, password };
      await UserController.createUser(req as Request, res as Response);

      expect(UserModel.findOne).toHaveBeenCalledWith({ email });
      expect(GenerateSalt).toHaveBeenCalled();
      expect(GeneratePassword).toHaveBeenCalledWith(password, salt);
      expect(UserModel.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
       });

    it('should handle existing user and return appropriate message', async () => {
      const email = 'existing@example.com';

      (UserModel as any).findOne.mockResolvedValue({ email });

      req.body = { name: 'Existing User', email, password: 'password' };
      await UserController.createUser(req as Request, res as Response);

      expect(UserModel.findOne).toHaveBeenCalledWith({ email });
      expect(res.json).toHaveBeenCalledWith({ Message: 'User already exists' });
    });

    it('should handle error during user creation and send status 400', async () => {
      (UserModel as any).findOne.mockRejectedValue(new Error('Database error'));

      req.body = { name: 'Test User', email: 'test@example.com', password: 'password' };
      await UserController.createUser(req as Request, res as Response);

      expect(UserModel.findOne).toHaveBeenCalled();
      expect(res.sendStatus).toHaveBeenCalledWith(400);
    });
  });

});

//update user


describe('UserController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
  
    beforeEach(() => {
      req = {};
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        sendStatus: jest.fn()
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('updateUser', () => {
      it('should update user by id', async () => {
        const userId = '1234567890';
        const updatedName = 'Updated Name';
        const updatedEmail = 'updated@example.com';
        const userMock = { name: updatedName, email: updatedEmail };
  
        (UserModel as any).findById.mockResolvedValue(userMock);
        req.params = { id: userId };
        req.body = { name: updatedName, email: updatedEmail };
  
        await UserController.updateUser(req as Request, res as Response);
  
        expect(UserModel.findById).toHaveBeenCalledWith(userId);
        

        
      });
  
      it('should handle error and send status 400', async () => {
        (UserModel as any).findById.mockRejectedValue(new Error('Database error'));
  
        req.params = { id: '1234567890' };
  
        await UserController.updateUser(req as Request, res as Response);
  
        expect(res.sendStatus).toHaveBeenCalledWith(400);
      });
    });
  });


  //deleting user

  describe('UserController - DeleteUser', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
  
    beforeEach(() => {
      req = { params: { id: '123' } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        sendStatus: jest.fn()
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should delete user by id', async () => {
      const userId = '123';
      (UserModel as any).findByIdAndDelete.mockResolvedValueOnce({});
  
      await UserController.DeleteUser(req as Request, res as Response);
  
      expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith({ _id: userId });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User deleted' });
    });
  
    it('should handle error and send status 400', async () => {
      (UserModel as any).findByIdAndDelete.mockRejectedValueOnce(new Error('Database error'));
  
      await UserController.DeleteUser(req as Request, res as Response);
  
      expect(res.sendStatus).toHaveBeenCalledWith(400);
    });
  });

  //signing in 

  describe('UserController - SignIn', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
  
    beforeEach(() => {
      req = { body: { email: 'test@example.com', password: 'password123' } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        sendStatus: jest.fn()
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should sign in user with valid credentials', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const token = 'jwt_token';
  
      const user = {
        email,
        password: 'hashedPassword',
        name: 'Test User'
      };
  
      (UserModel as any).findOne.mockResolvedValueOnce(user);
      (comparePassword as jest.Mock).mockResolvedValueOnce(true);
      (signToken as jest.Mock).mockReturnValueOnce(token);
  
      await UserController.SignIn(req as Request, res as Response);
  
      expect(UserModel.findOne).toHaveBeenCalledWith({ email });
      expect(comparePassword).toHaveBeenCalledWith(password, user.password);
      expect(res.status).toHaveBeenCalledWith(201);
        });
  
    it('should handle user not found', async () => {
      (UserModel as any).findOne.mockResolvedValueOnce(null);
  
      await UserController.SignIn(req as Request, res as Response);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'user not found' });
    });
  
    it('should handle incorrect password', async () => {
      const user = {
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User'
      };
  
      (UserModel as any).findOne.mockResolvedValueOnce(user);
      (comparePassword as jest.Mock).mockResolvedValueOnce(false);
  
      await UserController.SignIn(req as Request, res as Response);
  
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Incorrect password' });
    });
  
    it('should handle error and send status 400', async () => {
      (UserModel as any).findOne.mockRejectedValueOnce(new Error('Database error'));
  
      await UserController.SignIn(req as Request, res as Response);
  
      expect(res.sendStatus).toHaveBeenCalledWith(400);
    });
  });

  //getting user by id

  describe('UserController - getUser', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
  
    beforeEach(() => {
      req = { params: { id: '123' } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        sendStatus: jest.fn()
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should get user by id', async () => {
      const userId = '123';
      const user = {
        _id: userId,
        name: 'Test User',
        email: 'test@example.com'
      };
  
      (UserModel as any).findById.mockResolvedValueOnce(user);
  
      await UserController.getUser(req as Request, res as Response);
  
      expect(UserModel.findById).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: user });
    });
  
    it('should handle error and send status 400', async () => {
      (UserModel as any).findById.mockRejectedValueOnce(new Error('Database error'));
  
      await UserController.getUser(req as Request, res as Response);
  
      expect(res.sendStatus).toHaveBeenCalledWith(400);
    });
  });