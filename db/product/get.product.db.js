import { getDbInstance } from "../config/config.db.js";
import { productQueries } from "./query.db.js";

export async function getAllProductsFromDb() {
    try {
        const dbObj = getDbInstance();
        const result = await dbObj.query(productQueries.selectAllProducts);
        return { res: result.rows, err: null };
    } catch (error) {
        console.error("Error in getAllProductsFromDb:", error);
        return { res: null, err: error.message };
    }
}

export async function getProductByIdFromDb(productId) {
    try {
        const dbObj = getDbInstance();
        const result = await dbObj.query(productQueries.selectProductById, [productId]);
        
        if (result.rows.length === 0) {
            return { res: null, err: "Product not found" };
        }
        
        return { res: result.rows[0], err: null };
    } catch (error) {
        console.error("Error in getProductByIdFromDb:", error);
        return { res: null, err: error.message };
    }
}