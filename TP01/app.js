
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

app.get("/products/search", async (req, res) => {
    const id = req.query.id;
    const result = await db.query("SELECT * FROM products WHERE id = $1",[id]);

    res.json(result.rows[0]);
});

app.get("/products", async (req, res) => {
    const result = await db.query("SELECT * FROM products");

    res.json(result.rows);
});


app.post("/products", async (req, res) => {
    const { name, description, price, category } = req.body;
    const result = await db.query(
        "INSERT INTO products (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, description, price, category]
    );

    res.json(result.rows[0]);
});

app.put("/products", async (req, res) => {
    const id = req.query.id;
    const { name, description, price, category } = req.body;
    const result = await db.query(
        "UPDATE products SET name = $1, description = $2, price = $3, category = $4 WHERE id = $5 RETURNING *",
        [name, description, price, category, id]
    );

    res.json(result.rows[0]);
});

app.delete("/products", async (req, res) => {
    const id = req.query.id;
    const result = await db.query("DELETE FROM products WHERE id = $1 RETURNING *",[id]);

    res.json(result.rows[0]);
});

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});
