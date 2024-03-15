import express from 'express';
import blogcontroller from '../controllers/blogcontroller';

const routers = express.Router();

routers.get('/blog', blogcontroller.getAllBlog);
routers.get('/blog/:id', blogcontroller.getBlog);
routers.post('/blog', blogcontroller.createBlog);
routers.put('/blog/:id', blogcontroller.updateBlog);
routers.delete('/blog/:id', blogcontroller.DeleteBlog);


export default routers;
