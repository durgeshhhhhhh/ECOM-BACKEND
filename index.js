import express from "express";
import { routes } from "./routers/router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes());

app.listen(5000, (req, res) => {
    console.log("server is running on port 5000");
});

