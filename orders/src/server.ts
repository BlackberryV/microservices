"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const axios = require("axios");
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
  .then(() => {})
  .then((res: any) => {
    console.log(res);
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

app.use(bodyParser.json());
app.use(cors());

app.get("/orders", (req, res) => {
  const query = {
    text: "SELECT * FROM orders",
  };
  pool
    .query(query)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      res.status(500).json({ error: "Failed to retrieve orders" });
    });
});

app.post("/orders", (req, res) => {
  const { sellerId, productId } = req.body;
  const query = {
    text: "INSERT INTO orders(sellerId, productId) VALUES($1, $2) RETURNING *",
    values: [sellerId, productId],
  };
  pool
    .query(query)
    .then((result) => {
      res.status(201).json(result.rows[0]);
    })
    .catch((err) => {
      console.error("Error adding order:", err);
      res.status(500).json({ error: "Failed to add order" });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
