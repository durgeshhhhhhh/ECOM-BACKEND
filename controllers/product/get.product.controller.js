import { getAllProductsSvc, getProductByIdSvc } from "../../services/product/get.product.svc.js";

export async function getAllProductsController(req, res) {
    const response = await getAllProductsSvc();

    if (response.err) {
        return res.status(400).json({ error: response.err });
    }

    return res.json({
        products: response.res
    });
}

export async function getProductByIdController(req, res) {
    const productId = req.params.id;

    const response = await getProductByIdSvc(productId);

    if (response.err) {
        return res.status(400).json({ error: response.err });
    }

    return res.json({
        product: response.res
    });
}