const insertProductInDb = `INSERT INTO 
                          products (name, description, price, stock_quantity, category) 
                          VALUES($1, $2, $3, $4, $5) 
                          RETURNING *`;

const selectAllProducts = `SELECT * FROM products WHERE deleted_at IS NULL AND is_active = true`;

const selectProductById = `SELECT * FROM products WHERE id = $1 AND deleted_at IS NULL AND is_active = true`;

const updateProductById = `UPDATE products 
                          SET 
                          name = COALESCE($1, name),
                          description = COALESCE($2, description),
                          price = COALESCE($3, price),
                          stock_quantity = COALESCE($4, stock_quantity),
                          category = COALESCE($5, category),
                          updated_at = CURRENT_TIMESTAMP
                          WHERE id = $6 AND deleted_at IS NULL
                          RETURNING *`;

const deleteProductById = `UPDATE products 
                          SET deleted_at = CURRENT_TIMESTAMP,
                          is_active = false
                          WHERE id = $1
                          RETURNING *`;

const productQueries = {
    insertProductInDb,
    selectAllProducts,
    selectProductById,
    updateProductById,
    deleteProductById
};

export { productQueries };