import { Router } from "express";
import { userRoutes } from "./user/user.routes.js";
import { productRoutes } from "./product/product.routes.js";

export function routes() {
  const router = Router();

  userRoutes(router);
  productRoutes(router);

  return router;
}