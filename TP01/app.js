
const express = require("express");
const db = require("./db");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "Ça fonctionne !"});
});

app.get("/products", async (req, res) => {
        const result = await db.query("SELECT * FROM products");
        res.json(result.rows);
});

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});