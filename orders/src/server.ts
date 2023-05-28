"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const axios = require("axios");
var cors = require("cors");
const amqp = require("amqplib");

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

let channel;

async function connect() {
  const amqpServer =
    "amqp://default_user_XL1VozNCfiB4lk4yvb_:iaO-b_3MW2KX1eME4vYZy2KAunHW_yNl@hello-world:5672";
  const connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
}
connect();

async function addToQueue(productId, sellerId) {
  await channel.assertQueue("PRODUCTS_QUEUE");
  await channel.assertQueue("SELLERS_QUEUE");

  channel.sendToQueue(
    "PRODUCTS_QUEUE",
    Buffer.from(JSON.stringify({ productId }))
  );

  channel.sendToQueue(
    "SELLERS_QUEUE",
    Buffer.from(JSON.stringify({ sellerId }))
  );
}

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
      addToQueue(productId, sellerId);
    })
    .catch((err) => {
      console.error("Error adding order:", err);
      res.status(500).json({ error: "Failed to add order" });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
