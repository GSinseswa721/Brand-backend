import express  from "express";
import usercontroller from "../controllers/usercontroller";

const router = express.Router();

router.get('/user', usercontroller.getAllUser);
router.get('/user/:id', usercontroller.getUser);
router.post('/user', usercontroller.createUser);
router.put('/user/:id', usercontroller.updateUser);
router.delete('/user/:id', usercontroller.DeleteUser);

export default router;
