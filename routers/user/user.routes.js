import { Router } from "express";
import { signupController } from "../../controllers/user/register.user.controller.js";
import { loginController } from "../../controllers/user/login.user.controller.js";

export function userRoutes(router) {
    var userRouter = Router();
    userRouter.post("/signup", signupController);
    userRouter.post("/login", loginController);
    router.use("/user", userRouter);
}
