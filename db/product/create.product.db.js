import { getDbInstance } from "../config/config.db.js";
import { productQueries } from "./query.db.js";

export async function createProductInDb(product) {
    try {
        const dbObj = getDbInstance();
        
        const result = await dbObj.query(productQueries.insertProductInDb, [
            product.name,
            product.description,
            product.price,
            product.stock_quantity,
            product.category
        ]);

        console.log("Product created:", result.rows[0]);
        return { res: result.rows[0], err: null };
    } catch (error) {
        console.error("Error in createProductInDb:", error);
        return { res: null, err: error.message };
    }
}