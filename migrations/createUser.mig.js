export async function createUserTable(dbObj) {
    let createUserTableQuery = `CREATE TABLE IF NOT EXISTS "users"(
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )`;

    let res = await dbObj.query(createUserTableQuery);
}
