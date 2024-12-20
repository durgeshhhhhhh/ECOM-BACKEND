import { Router } from "express";
import { signupController } from "../../controllers/user/register.user.controller.js";
import { loginController } from "../../controllers/user/login.user.controller.js";
import { jwtAuthentication } from "../../middlewares/auth.middleware.js";
import { refreshTokenController } from "../../controllers/user/refreshToken.controller.js";
import { updateUserController } from "../../controllers/user/update.user.controller.js";

export function userRoutes(router) {
    var userRouter = Router();
    userRouter.post("/signup", signupController);
    userRouter.post("/login", loginController);
    userRouter.post("/refresh-token", refreshTokenController);
    userRouter.put("/update", jwtAuthentication, updateUserController);

    userRouter.get("/profile", jwtAuthentication, (req, res) => {
        res.json({ message: "You accessed a protected route", user: req.user });
    });
    router.use("/user", userRouter);
}
