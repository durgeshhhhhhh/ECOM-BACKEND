export async function createUserTable(dbObj) {
    let createUserTableQuery = `CREATE TABLE IF NOT EXISTS "user"(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        phone_number TEXT,
        dob DATE
    )`;

    let res = await dbObj.query(createUserTableQuery);
}
