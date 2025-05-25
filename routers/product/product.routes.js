import { Router } from "express";
import { createProductController } from "../../controllers/product/create.product.controller.js";
import { getAllProductsController, getProductByIdController } from "../../controllers/product/get.product.controller.js";
import { updateProductController } from "../../controllers/product/update.product.controller.js";
import { deleteProductController } from "../../controllers/product/delete.product.controller.js";
import { jwtAuthentication } from "../../middlewares/auth.middleware.js";

export function productRoutes(router) {
    const productRouter = Router();

    // Public routes
    productRouter.get("/", getAllProductsController);
    productRouter.get("/:id", getProductByIdController);

    // Protected routes (require authentication)
    productRouter.post("/", jwtAuthentication, createProductController);
    productRouter.put("/:id", jwtAuthentication, updateProductController);
    productRouter.delete("/:id", jwtAuthentication, deleteProductController);

    router.use("/products", productRouter);
}