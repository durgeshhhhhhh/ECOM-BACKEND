import { deleteProductFromDb } from "../../db/product/delete.product.db.js";

export async function deleteProductSvc(productId) {
    const result = await deleteProductFromDb(productId);
    
    if (result.err) {
        return { err: result.err };
    }
    return { res: result.res };
}