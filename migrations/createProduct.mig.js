export async function createProductTable(dbObj) {
    let createProductTableQuery = `CREATE TABLE IF NOT EXISTS "products"(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        stock_quantity INTEGER NOT NULL DEFAULT 0,
        category VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE,
        is_active BOOLEAN DEFAULT TRUE,
        deleted_at TIMESTAMP WITH TIME ZONE
    )`;

    await dbObj.query(createProductTableQuery);
}