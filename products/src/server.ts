'use strict'

const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors')
const PORT = 8080

let products = [
    {
        id: 1,
        title: 'apple',
        description: 'good fruit',
        price: 5,
        category: 'food',
      },
      {
        id: 2,
        title: 'iphone',
        description: 'expensive phone',
        price: 1000,
        category: 'smartphones',
      },
      {
        id: 3,
        title: 'nike no air',
        description: 'white shoes',
        price: 200,
        category: 'clothes',
      },
      {
        id: 4,
        title: 'zubrovka',
        description: '...',
        price: 25,
        category: 'alcohol',
      },
      {
        id: 5,
        title: 'fotball ball',
        description: 'good ball',
        price: 55,
        category: 'sport',
      },
];

const app = express()
app.use(bodyParser.json());
app.use(cors());

app.get('/products/:id', (req, res) => {
  const product = products.find(f => f.id === parseInt(req.params.id));
  if (!product) {
    res.status(404).send('product not found');
  } else {
    res.send(product);
  }
});

app.get('/products', (req, res) => {
  res.send(products);
});

app.post('/products', (req, res) => {
  const product = req.body;
  product.id = products.length + 1;
  products.push(product);
  res.send(product);
});

app.put('/products/:id', (req, res) => {
  const product = products.find(f => f.id === parseInt(req.params.id));
  if (!product) {
    res.status(404).send('product not found');
  } else {
    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;

    res.send('product updated successfully');
  }
});

app.delete('/products/:id', (req, res) => {
  const index = products.findIndex(product => product.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send('product not found');
  } else {
    products.splice(index, 1);

    res.send('product deleted successfully');
  }
});

app.listen(PORT, () => {
  console.log(`Running ${PORT}`)
})