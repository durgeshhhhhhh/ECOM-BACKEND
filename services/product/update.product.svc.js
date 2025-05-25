import { updateProductInDb } from "../../db/product/update.product.db.js";

export async function updateProductSvc(productId, updatedData) {
    const result = await updateProductInDb(productId, updatedData);
    
    if (result.err) {
        return { err: result.err };
    }
    return { res: result.res };
}