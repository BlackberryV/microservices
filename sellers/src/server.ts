'use strict'

const express = require('express')
const bodyParser = require('body-parser');
const { Pool } = require('pg');
var cors = require('cors')
const PORT = 8080

const app = express();

const pool = new Pool({
  user: "demo",
  host: "postgres",
  database: "demo",
  password: "demo",
  port: 5432
})

console.log(pool);

pool.connect()
  .then(() => {
    return pool.query(`
      CREATE TABLE IF NOT EXISTS sellers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phoneNumber TEXT NOT NULL
      )
    `);
  })
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

app.use(bodyParser.json());
app.use(cors());

app.get('/sellers/:id', (req, res) => {
  const query = {
    text: 'SELECT * FROM sellers WHERE id = $1',
    values: [req.params.id],
  };
  pool.query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'seller not found' });
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch((err) => {
      console.log(query);
      res.status(500).json({ error: 'Failed to retrieve seller' });
    });
});

app.get('/sellers', (req, res) => {
  const query = {
    text: 'SELECT * FROM sellers',
  };
  pool.query(query)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      res.status(500).json({ error: 'Failed to retrieve sellers' });
    });
});

app.post('/sellers', (req, res) => {
  const { name, phoneNumber } = req.body;
  const query = {
    text: 'INSERT INTO sellers(name, phoneNumber) VALUES($1, $2) RETURNING *',
    values: [name, phoneNumber],
  };
  pool.query(query)
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((err) => {
      console.error('Error adding seller:', err);
      res.status(500).json({ error: 'Failed to add seller' });
    });
});

app.put('/sellers/:id', (req, res) => {
  const { name, phoneNumber } = req.body;
  const query = {
    text: 'UPDATE sellers SET name = $1, phoneNumber = $2 WHERE id = $3 RETURNING *',
    values: [name, phoneNumber, req.params.id],
  };
  pool.query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'seller not found' });
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch((err) => {
      console.error('Error updating seller:', err);
      res.status(500).json({ error: 'Failed to update seller' });
    });
});

app.delete('/sellers/:id', (req, res) => {
  const query = {
    text: 'DELETE FROM sellers WHERE id = $1 RETURNING *',
    values: [req.params.id],
  };
  pool.query(query)
  .then((result) => {
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'seller not found' });
    } else {
      res.json(result.rows[0]);
    }
  })
  .catch((err) => {
    console.error('Error deleting seller:', err);
    res.status(500).json({ error: 'Failed to delete seller' });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});