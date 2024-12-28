const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const products = [
  { id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/200' },
  { id: 2, name: 'Product 2', price: 39.99, image: 'https://via.placeholder.com/200' },
  { id: 3, name: 'Product 3', price: 49.99, image: 'https://via.placeholder.com/200' },
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
