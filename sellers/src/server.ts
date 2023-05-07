'use strict'

const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors')
const PORT = 8080

let sellers = [
  { id: 0, name: 'Jake', phoneNumber: '+3807765654' },
  { id: 1, name: 'Kate', phoneNumber: '+3807231413' },
  { id: 2, name: 'Ann', phoneNumber: '+38077656542' },
  { id: 3, name: 'Tom', phoneNumber: '+38077656587' },
];

const app = express()
app.use(bodyParser.json());
app.use(cors());

app.get('/sellers/:id', (req, res) => {
  const seller = sellers.find(f => f.id === parseInt(req.params.id));
  if (!seller) {
    res.status(404).send('seller not found');
  } else {
    res.send(seller);
  }
});

app.get('/sellers', (req, res) => {
  res.send(sellers);
});

app.post('/sellers', (req, res) => {
  const seller = req.body;
  seller.id = sellers.length + 1;
  sellers.push(seller);
  res.send(seller);
});

app.put('/sellers/:id', (req, res) => {
  const seller = sellers.find(seller => seller.id === parseInt(req.params.id));
  if (!seller) {
    res.status(404).send('seller not found');
  } else {
    seller.name = req.body.name || seller.name;
    seller.phoneNumber = req.body.phoneNumber || seller.phoneNumber;

    res.send('seller updated successfully');
  }
});

app.delete('/sellers/:id', (req, res) => {
  const index = sellers.findIndex(seller => seller.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send('seller not found');
  } else {
    sellers.splice(index, 1);

    res.send('seller deleted successfully');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});