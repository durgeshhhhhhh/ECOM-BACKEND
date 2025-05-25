import { deleteProductSvc } from "../../services/product/delete.product.svc.js";

export async function deleteProductController(req, res) {
    const productId = req.params.id;

    const response = await deleteProductSvc(productId);

    if (response.err) {
        return res.status(400).json({ error: response.err });
    }

    return res.json({
        message: "Product deleted successfully",
        product: response.res
    });
}