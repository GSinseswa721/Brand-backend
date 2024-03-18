import express from 'express';
import blogcontroller from '../controllers/blogcontroller';
import isAuthenticated from '../utils/verifytoken';

const routers = express.Router();
routers.use(isAuthenticated);
routers.get('/', blogcontroller.getAllBlog);
routers.get('/byid/:id', blogcontroller.getBlog);
routers.post('/', blogcontroller.createBlog);
routers.put('/:id', blogcontroller.updateBlog);
routers.delete('/:id', blogcontroller.DeleteBlog);


export default routers;
