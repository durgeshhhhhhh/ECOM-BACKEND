export async function createUserTable(dbObj) {
    let createUserTableQuery = `CREATE TABLE IF NOT EXISTS "users"(
        id SERIAL PRIMARY KEY,
        name varchar(100) NOT NULL,
        phone_no varchar(15) UNIQUE,
        dob DATE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        refresh_token TEXT
    )`;

    let res = await dbObj.query(createUserTableQuery);
}
