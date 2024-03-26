import express from 'express';
import { Request, Response } from 'express';
import BlogController from '../controllers/blogcontroller';
import { BlogModel } from '../models/blog';

jest.mock('../models/blog');

describe('BlogController', () => {
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

  describe('getAllBlog', () => {
    it('should return all blogs', async () => {
      const blogs = [{ title: 'Blog 1', content: 'Content 1' }, { title: 'Blog 2', content: 'Content 2' }];
      (BlogModel as any).find.mockResolvedValue(blogs);

      await BlogController.getAllBlog(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: blogs });
    });

    it('should handle error and send status 400', async () => {
      (BlogModel as any).find.mockRejectedValue(new Error('Database error'));

      await BlogController.getAllBlog(req as Request, res as Response);

      expect(res.sendStatus).toHaveBeenCalledWith(400);
    });
  });
});

//testing creating blog

describe('BlogController', () => {
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

  describe('createBlog', () => {
    it('should create a new blog successfully', async () => {
      const title = 'Test Blog';
      const content = 'Lorem ipsum dolor sit amet';
      const image = 'test.jpg';

      req.body = { title, content, image };
      const blogMock = {
        save: jest.fn(),
      };
      (BlogModel as any).mockReturnValue(blogMock);

      await BlogController.createBlog(req as Request, res as Response);
      expect(BlogModel).toHaveBeenCalledWith({ title, content, image });
      expect(blogMock.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);

    });

    it('should handle error during blog creation and send status 400', async () => {
      req.body = { title: 'Test Blog', content: 'Lorem ipsum dolor sit amet', image: 'test.jpg' };
      (BlogModel as any).mockImplementation(() => {
        throw new Error('Database error');
      });

      await BlogController.createBlog(req as Request, res as Response);

      expect(BlogModel).toHaveBeenCalled();
      expect(res.sendStatus).toHaveBeenCalledWith(400);
    });
  });
});

//updating 


describe('BlogController - updateBlog', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { params: { id: '123' }, body: { title: 'Updated Title', content: 'Updated Content', image: 'updated-image.jpg' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update blog by id', async () => {
    const blogId = '123';
    const updatedTitle = 'Updated Title';
    const updatedContent = 'Updated Content';
    const updatedImage = 'updated-image.jpg';

    const saveMock = jest.fn().mockResolvedValueOnce({
      _id: blogId,
      title: updatedTitle,
      content: updatedContent,
      image: updatedImage,
      save: jest.fn().mockResolvedValueOnce({ 
        _id: blogId,
        title: updatedTitle,
        content: updatedContent,
        image: updatedImage,
      })
    });
    return saveMock;

    await BlogController.updateBlog(req as Request, res as Response);

    expect(BlogModel.findById).toHaveBeenCalledWith(blogId);
    expect(res.status).toHaveBeenCalledWith(201);
   
  });
});

// deleting


describe('BlogController - deleteBlog', () => {
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

  it('should delete blog by id', async () => {
    const blogId = '123';

    (BlogModel as any).findByIdAndDelete.mockResolvedValueOnce({});

    await BlogController.deleteBlog(req as Request, res as Response);

    expect(BlogModel.findByIdAndDelete).toHaveBeenCalledWith({_id: blogId});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Blog deleted' });
  });

  it('should handle error and send status 400', async () => {
    (BlogModel as any).findByIdAndDelete.mockRejectedValueOnce(new Error('Database error'));

    await BlogController.deleteBlog(req as Request, res as Response);

    expect(res.sendStatus).toHaveBeenCalledWith(400);
  });
});

//one blog

describe('BlogController - getBlog', () => {
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

  it('should get blog by id', async () => {
    const blogId = '123';
    const blogMock = { _id: blogId, title: 'Test Blog', content: 'Lorem ipsum dolor sit amet', image: 'test.jpg' };

    (BlogModel as any).findById.mockResolvedValueOnce(blogMock);

    await BlogController.getBlog(req as Request, res as Response);

    expect(BlogModel.findById).toHaveBeenCalledWith(blogId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: blogMock });
  });

  it('should handle error and send status 400', async () => {
    (BlogModel as any).findById.mockRejectedValueOnce(new Error('Database error'));

    await BlogController.getBlog(req as Request, res as Response);

    expect(res.sendStatus).toHaveBeenCalledWith(400);
  });
});