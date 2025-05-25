import { updateProductSvc } from "../../services/product/update.product.svc.js";

export async function updateProductController(req, res) {
    const productId = req.params.id;
    const { name, description, price, stock_quantity, category } = req.body;

    const response = await updateProductSvc(productId, {
        name,
        description,
        price,
        stock_quantity,
        category
    });

    if (response.err) {
        return res.status(400).json({ error: response.err });
    }

    return res.json({
        message: "Product updated successfully",
        product: response.res
    });
}