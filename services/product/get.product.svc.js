import { getAllProductsFromDb, getProductByIdFromDb } from "../../db/product/get.product.db.js";

export async function getAllProductsSvc() {
    const result = await getAllProductsFromDb();
    
    if (result.err) {
        return { err: result.err };
    }
    return { res: result.res };
}

export async function getProductByIdSvc(productId) {
    const result = await getProductByIdFromDb(productId);
    
    if (result.err) {
        return { err: result.err };
    }
    return { res: result.res };
}