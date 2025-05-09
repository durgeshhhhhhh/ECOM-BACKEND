import { Router } from "express";
import { userRoutes } from "./user/user.routes.js";

export function routes() {
  const router = Router();

  userRoutes(router);

  return router;
}
