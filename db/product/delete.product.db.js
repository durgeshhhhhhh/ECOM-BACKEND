import { getDbInstance } from "../config/config.db.js";
import { productQueries } from "./query.db.js";

export async function deleteProductFromDb(productId) {
    try {
        const dbObj = getDbInstance();
        const result = await dbObj.query(productQueries.deleteProductById, [productId]);

        if (result.rows.length === 0) {
            return { res: null, err: "Product not found" };
        }

        return { res: result.rows[0], err: null };
    } catch (error) {
        console.error("Error in deleteProductFromDb:", error);
        return { res: null, err: error.message };
    }
}