import express  from "express";
import usercontroller from "../controllers/usercontroller";
import isAuthenticated from "../utils/verifytoken";

const router = express.Router();
/**
 * @openapi
 * /user:
 *   post:
 *     tags:
 *       - CreateUser
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict - User already exists
 */


router.post('/', usercontroller.createUser);

/**
 * @openapi
 * /user/signin:
 *   post:
 *     tags:
 *       - SignIn
 *     summary: Sign in with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User signed in successfully
 *       401:
 *         description: Unauthorized - Incorrect email or password
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */

router.post('/signin', usercontroller.SignIn);

/**
 * @openapi
 * /user:
 *   get:
 *     tags:
 *       - GetAllUsers
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all users
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       400:
 *         description: Bad request
 */

router.use(isAuthenticated, usercontroller.getAllUser);

/**
 * @openapi
 * /user:
 *   get:
 *     tags:
 *       - GetAllUsers
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all users
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       400:
 *         description: Bad request
 */
router.get('/', isAuthenticated,usercontroller.getAllUser);


/**
 * @openapi
 * /user/byid/{id}:
 *   get:
 *     tags:
 *       - GetUserById
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the user
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       400:
 *         description: Bad request
 */
router.get('/byid/:id',isAuthenticated, usercontroller.getUser);

/**
 * @openapi
 * /user/{id}:
 *   put:
 *     tags:
 *       - UpdateUser
 *     summary: Update user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       400:
 *         description: Bad request
 */
router.put('/:id',isAuthenticated, usercontroller.updateUser);

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     tags:
 *       - DeleteUser
 *     summary: Delete user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       400:
 *         description: Bad request
 */
router.delete('/:id', isAuthenticated, usercontroller.DeleteUser);


export default router;
