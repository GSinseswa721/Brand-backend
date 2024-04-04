import request from 'supertest'; // Install using `npm install --save-dev supertest`
import express from 'express';
import BlogController from '../controllers/blogcontroller';
import { BlogModel } from '../models/blog';

jest.mock('../models/blog', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const app = express();
app.use(express.json());

describe('BlogController', () => {
  describe('getAllBlog', () => {
    it('should return all blogs', async () => {
      const mockBlogs = [{ title: 'Blog 1', content: 'Content 1' }, { title: 'Blog 2', content: 'Content 2' }];
      (BlogModel.find as jest.Mock).mockResolvedValue(mockBlogs);

      const response = await request(app).get('/blogs');
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockBlogs);
    });

    it('should handle errors', async () => {
      (BlogModel.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/blogs');
      expect(response.status).toBe(400);
    });
  });
  
  describe('BlogController', () => {
    describe('createBlog', () => {
      it('should create a new blog', async () => {
        const mockBlog = { title: 'New Blog', content: 'New Content', image: 'http://example.com/image.jpg' };
        (BlogModel.create as jest.Mock).mockResolvedValue(mockBlog);
  
        const response = await request(app)
          .post('/blogs')
          .field('title', 'New Blog')
          .field('content', 'New Content')
          .attach('image', 'test.jpg'); // assuming you're uploading a file
        expect(response.status).toBe(201);
        expect(response.body.data).toEqual(mockBlog);
      });
  
      it('should handle error if no file uploaded', async () => {
        const response = await request(app)
          .post('/blogs')
          .send({ title: 'New Blog', content: 'New Content' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('No file uploaded');
      });
  
      it('should handle errors', async () => {
        (BlogModel.create as jest.Mock).mockRejectedValue(new Error('Database error'));
  
        const response = await request(app)
          .post('/blogs')
          .field('title', 'New Blog')
          .field('content', 'New Content')
          .attach('image', 'test.jpg');
        expect(response.status).toBe(400);
      });
    });
  });
  describe('BlogController', () => {
    describe('deleteBlog', () => {
      it('should delete a blog', async () => {
        const mockId = '1234567890abcdef12345678'; // Sample ID
        (BlogModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
  
        const response = await request(app).delete(`/blogs/${mockId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Blog deleted');
      });
  
      it('should handle errors', async () => {
        const mockId = '1234567890abcdef12345678'; // Sample ID
        (BlogModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('Database error'));
  
        const response = await request(app).delete(`/blogs/${mockId}`);
        expect(response.status).toBe(400); 
      });
    });
  }); 

  describe('BlogController', () => {
    describe('updateBlog', () => {
      it('should update a blog', async () => {
        const mockId = '1234567890abcdef12345678'; // Sample ID
        const mockRequestBody = {
          title: 'Updated Title',
          content: 'Updated Content',
        };
        const mockUpdatedBlog = {
          _id: mockId,
          title: mockRequestBody.title,
          content: mockRequestBody.content,
          image: 'https://example.com/image.jpg',
        };
        (BlogModel.findById as jest.Mock).mockResolvedValue(mockUpdatedBlog);
        (BlogModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedBlog);
  
        const response = await request(app)
          .put(`/blogs/${mockId}`)
          .send(mockRequestBody);
  
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Blog updated');
        expect(response.body.data).toEqual(mockUpdatedBlog);
      });
  
      it('should handle blog not found', async () => {
        const mockId = 'nonexistentId';
        (BlogModel.findById as jest.Mock).mockResolvedValue(null);
  
        const response = await request(app)
          .put(`/blogs/${mockId}`)
          .send({});
  
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('No Blog Found');
      });
  
      it('should handle internal server error', async () => {
        const mockId = '1234567890abcdef12345678'; // Sample ID
        (BlogModel.findById as jest.Mock).mockRejectedValue(new Error('Database error'));
  
        const response = await request(app)
          .put(`/blogs/${mockId}`)
          .send({});
  
        expect(response.status).toBe(500);
        expect(response.body.Message).toBe('Internal server error');
      });
    });
  });

});
