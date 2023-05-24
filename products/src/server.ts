"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
var cors = require("cors");
const PORT = 8080;

const app = express();

const pool = new Pool({
  user: "demo",
  host: "postgres",
  database: "demo",
  password: "demo",
  port: 5432,
});

pool
  .connect()
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

app.use(bodyParser.json());
app.use(cors());

app.get("/products/:id", (req, res) => {
  const query = {
    text: "SELECT * FROM products WHERE id = $1",
    values: [req.params.id],
  };
  pool
    .query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: "product not found" });
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch((err) => {
      console.log(query);
      res.status(500).json({ error: "Failed to retrieve product" });
    });
});

app.get("/products", (req, res) => {
  const query = {
    text: "SELECT * FROM products",
  };
  pool
    .query(query)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      res.status(500).json({ error: "Failed to retrieve products" });
    });
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;
  const query = {
    text: "INSERT INTO products(name, price) VALUES($1, $2) RETURNING *",
    values: [name, price],
  };
  pool
    .query(query)
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((err) => {
      console.error("Error adding product:", err);
      res.status(500).json({ error: "Failed to add product" });
    });
});

app.put("/products/:id", (req, res) => {
  const { name, price } = req.body;
  const query = {
    text: "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *",
    values: [name, price, req.params.id],
  };
  pool
    .query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: "product not found" });
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch((err) => {
      console.error("Error updating product:", err);
      res.status(500).json({ error: "Failed to update product" });
    });
});

app.delete("/products/:id", (req, res) => {
  const query = {
    text: "DELETE FROM products WHERE id = $1 RETURNING *",
    values: [req.params.id],
  };
  pool
    .query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: "product not found" });
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch((err) => {
      console.error("Error deleting product:", err);
      res.status(500).json({ error: "Failed to delete product" });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
