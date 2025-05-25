import { createProductInDb } from "../../db/product/create.product.db.js";

export async function createProductSvc(name, description, price, stock_quantity, category) {
    const result = await createProductInDb({
        name,
        description,
        price,
        stock_quantity,
        category
    });

    if (result.err) {
        return { err: result.err };
    }
    return { res: result.res };
}