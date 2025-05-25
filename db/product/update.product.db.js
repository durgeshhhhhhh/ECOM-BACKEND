import { getDbInstance } from "../config/config.db.js";
import { productQueries } from "./query.db.js";

export async function updateProductInDb(productId, updatedData) {
    try {
        const dbObj = getDbInstance();
        const { name, description, price, stock_quantity, category } = updatedData;
        
        const result = await dbObj.query(productQueries.updateProductById, [
            name,
            description,
            price,
            stock_quantity,
            category,
            productId
        ]);

        if (result.rows.length === 0) {
            return { res: null, err: "Product not found" };
        }

        return { res: result.rows[0], err: null };
    } catch (error) {
        console.error("Error in updateProductInDb:", error);
        return { res: null, err: error.message };
    }
}