import express from 'express';
import blogcontroller from '../controllers/blogcontroller';
import isAuthenticated from '../utils/verifytoken';

const routers = express.Router();

routers.use(isAuthenticated);


routers.get('/blog', blogcontroller.getAllBlog);


routers.get('/blog/:id', blogcontroller.getBlog);


routers.post('/blog', blogcontroller.createBlog);
routers.put('/blog/:id', blogcontroller.updateBlog);
routers.delete('/blog/:id', blogcontroller.deleteBlog);


export default routers;
