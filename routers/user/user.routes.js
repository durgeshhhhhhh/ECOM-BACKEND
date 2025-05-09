import { Router } from "express";
import { signupController } from "../../controllers/user/signup.user.controller.js";
import { loginController } from "../../controllers/user/login.user.controller.js";
import { jwtAuthentication } from "../../middlewares/auth.middleware.js";
import { refreshTokenController } from "../../controllers/user/refreshToken.controller.js";
import { updateUserController } from "../../controllers/user/update.user.controller.js";
import { logoutController } from "../../controllers/user/logout.user.controller.js";
import { deleteUserController } from "../../controllers/user/delete.user.controller.js";
import { deactivateUserController } from "../../controllers/user/deactivate.user.controller.js";
import { activateUserController } from "../../controllers/user/activate.user.controller.js";

export function userRoutes(router) {
  var userRouter = Router();
  userRouter.post("/signup", signupController);
  userRouter.post("/login", loginController);
  userRouter.post("/refresh-token", refreshTokenController);
  userRouter.put("/update", jwtAuthentication, updateUserController);
  userRouter.post("/logout", jwtAuthentication, logoutController);
  userRouter.delete("/delete", jwtAuthentication, deleteUserController);
  userRouter.put("/deactivate", jwtAuthentication, deactivateUserController);
  userRouter.put("/activate", activateUserController);
  userRouter.get("/profile", jwtAuthentication, (req, res) => {
    res.json({ message: "You accessed a protected route", user: req.user });
  });

  router.use("/user", userRouter);
}
