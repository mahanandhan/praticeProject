import express from "express";
import { registerUser, loginUser, getUserProfile, updateProfile, getUsers } from "../controllers/userController.js";
import authMiddleWare from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile",authMiddleWare, getUserProfile);
userRouter.put("/update",authMiddleWare, updateProfile);
userRouter.get("/users", getUsers);


export default userRouter;