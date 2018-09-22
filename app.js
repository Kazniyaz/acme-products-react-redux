const express = require('express');
const app = express();
const { Product } = require('./db/index');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/api/products', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(console.log('DB Error getting products!'));
});

app.post('/api/products', (req, res, next) => {
  console.log(req.body);
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(console.log('DB Error creating a product'));
});

app.delete('/api/products/:id', (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.sendStatus(204))
    .catch(console.log('DB Error deleteting a product'));
});
module.exports = app;
