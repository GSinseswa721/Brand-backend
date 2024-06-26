import express from 'express';
import blogcontroller from '../controllers/blogcontroller';
import upload from '../utils/mult';

//import isAuthenticated from '../utils/verifytoken';


// Middleware for parsing JSON and handling URL-encoded form data


const routers = express.Router();

//routers.use();


/**
 * @openapi
 * tags:
 *   name: Blog
 *   description: Operations for blog
 * 
 *     "servers": [
 *  {
 *           "url": "https://https://brand-backend-zqib.onrender.com/",
 *          "description": "Live Production Server",
            "variables": {}
        },
        {
            "url": "http://localhost:4000",
            "description": "Local Development Server",
            "variables": {}
        }
    ]
 * 
 * 
 * 
 */

/**
 * @openapi
 * /blog:
 *   get:
 *     summary: Retrieve all blogs
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: A list of blogs
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
routers.get('/', blogcontroller.getAllBlog);

/**
 * @openapi
 * /blog/{id}:
 *   get:
 *     summary: Retrieve a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: A single blog object
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal Server Error
 */


routers.get('/:id', blogcontroller.getBlog);

/**
 * @openapi
 * /blog:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: file
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
routers.post('/', upload.single("image") ,blogcontroller.createBlog);

/**
 * @openapi
 * /blog/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: file
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal Server Error
 */
routers.put('/:id',upload.single("image") , blogcontroller.updateBlog);

/**
 * @openapi
 * /blog/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal Server Error
 */
routers.delete('/:id', blogcontroller.deleteBlog);

//comments
routers.post('/:id/comments', blogcontroller.addComment);

// PUT update a comment by ID
routers.put('/:blogId/comments/:commentId', blogcontroller.updateComment);

// DELETE a comment by ID
routers.delete('/:blogId/comments/:commentId', blogcontroller.deleteComment);

// POST like a blog
routers.post('/:id/like', blogcontroller.likeBlog);

routers.get('/blogs/:id/comments', blogcontroller.getCommentsForBlog);
//comments
routers.post('/:id/comments', blogcontroller.addComment);

// PUT update a comment by ID
routers.put('/:blogId/comments/:commentId', blogcontroller.updateComment);

// DELETE a comment by ID
routers.delete('/:blogId/comments/:commentId', blogcontroller.deleteComment);

// POST like a blog
routers.post('/:id/like', blogcontroller.likeBlog);

routers.get('/blogs/:id/comments', blogcontroller.getCommentsForBlog);

routers.get('/blogs/:id/likes', blogcontroller.getLikesForBlog);


export default routers;
