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
  .then(() => {
    // `SELECT * FROM sellers`;
  })
  .then((res: any) => {
    console.log(res);
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

app.use(bodyParser.json());
app.use(cors());

app.get("/sellers/:id", (req, res) => {
  const query = {
    text: "SELECT * FROM sellers WHERE id = $1",
    values: [req.params.id],
  };
  pool
    .query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: "seller not found" });
      } else {
        res.json(result.rows[0]);
        console.log("retrieved seller");
      }
    })
    .catch((err) => {
      console.log(query);
      res.status(500).json({ error: "Failed to retrieve seller" });
    });
});

app.get("/sellers", (req, res) => {
  const query = {
    text: "SELECT * FROM sellers",
  };
  pool
    .query(query)
    .then((result) => {
      res.json(result.rows);
      console.log("retrieved all sellers");
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to retrieve sellers" });
    });
});

app.post("/sellers", (req, res) => {
  const { name, phoneNumber } = req.body;
  const count = 0;
  const query = {
    text: "INSERT INTO sellers(name, phoneNumber, count) VALUES($1, $2, $3) RETURNING *",
    values: [name, phoneNumber, count],
  };
  pool
    .query(query)
    .then((result) => {
      res.status(201).json(result.rows[0]);
      console.log("created seller");
    })
    .catch((err) => {
      console.error("Error adding seller:", err);
      res.status(500).json({ error: "Failed to add seller" });
    });
});

app.put("/sellers/:id", (req, res) => {
  const { name, phoneNumber, count } = req.body;
  const query = {
    text: "UPDATE sellers SET name = $1, phoneNumber = $2, count = $3 WHERE id = $4 RETURNING *",
    values: [name, phoneNumber, count, req.params.id],
  };
  pool
    .query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: "seller not found" });
      } else {
        res.json(result.rows[0]);
        console.log("updated seller");
      }
    })
    .catch((err) => {
      console.error("Error updating seller:", err);
      res.status(500).json({ error: "Failed to update seller" });
    });
});

app.delete("/sellers/:id", (req, res) => {
  const query = {
    text: "DELETE FROM sellers WHERE id = $1 RETURNING *",
    values: [req.params.id],
  };
  pool
    .query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: "seller not found" });
      } else {
        res.json(result.rows[0]);
        console.log("deleted seller");
      }
    })
    .catch((err) => {
      console.error("Error deleting seller:", err);
      res.status(500).json({ error: "Failed to delete seller" });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
