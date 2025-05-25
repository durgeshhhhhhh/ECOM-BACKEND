import { createProductSvc } from "../../services/product/create.product.svc.js";

export async function createProductController(req, res) {
    const { name, description, price, stock_quantity, category } = req.body;

    if (!name || !price || !stock_quantity) {
        return res.status(400).json({ error: "Name, price, and stock quantity are required" });
    }

    const response = await createProductSvc(name, description, price, stock_quantity, category);

    if (response.err) {
        return res.status(400).json({ error: response.err });
    }

    return res.status(201).json({
        message: "Product created successfully",
        product: response.res
    });
}