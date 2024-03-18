import express  from "express";
import usercontroller from "../controllers/usercontroller";
import isAuthenticated from "../utils/verifytoken";

const router = express.Router();
router.post('/', usercontroller.createUser);
router.post('/signin', usercontroller.SignIn);

router.use(isAuthenticated);
router.get('/', usercontroller.getAllUser);
router.get('/byid/:id', usercontroller.getUser);
router.put('/:id', usercontroller.updateUser);
router.delete('/:id', usercontroller.DeleteUser);


export default router;
