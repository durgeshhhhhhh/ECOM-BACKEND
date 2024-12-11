export async function createUserTable(dbObj) {
    let createUserTableQuery = `CREATE TABLE IF NOT EXISTS "users"(
        id SERIAL PRIMARY KEY,
        name varchar(100) NOT NULL,
        phone_no varchar(15) UNIQUE,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`;

    let res = await dbObj.query(createUserTableQuery);

    await dbObj.query(`
        ALTER TABLE "users" ADD COLUMN IF NOT EXISTS refresh_token TEXT;
    `);
}
