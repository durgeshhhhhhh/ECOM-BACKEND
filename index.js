import express from "express";
import { routes } from "./routers/router.js";
import { dbSetup, getDbInstance } from "./db/config/config.db.js";
import { createUserTable } from "./migrations/createUser.mig.js";

async function main() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(routes());
  await dbSetup();
  await createUserTable(getDbInstance());

  app.listen(3000, (req, res) => {
    console.log("server is running on port 3000");
  });
}

main();