import { Router } from "express";
import { signupController } from "../../controllers/user/signup.user.controller.js";

export function userRoutes(router){
 var userRouter = Router();
 userRouter.post("/signup", signupController);
 router.use("/user", userRouter);
}
