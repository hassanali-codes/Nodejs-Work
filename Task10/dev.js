const express = require("express");
const app = express();

app.use(express.json());

let products = [];
let orders = [];

let productID = 1;
let orderID = 1;

app.post("/product", (req, res) => {
  const { name, price, stock } = req.body;

  // Validations
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({ error: "Price must be a number > 0" });
  }
  if (typeof stock !== "number" || stock < 0) {
    return res.status(400).json({ error: "Stock must be a number ≥ 0" });
  }

  const newProduct = {
    id: productID++,
    name,
    price,
    stock
  };

  products.push(newProduct);

  res.json({
    status: "success",
    product: newProduct
  });
});


app.get("/product", (req, res) => {
  res.json(products);
});

app.post("/order", (req, res) => {
  const { productId, quantity } = req.body;

  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (product.stock < quantity) {
    return res.status(400).json({ error: "Not enough stock" });
  }

  product.stock -= quantity;

  const newOrder = {
    id: orderID++,
    productId,
    quantity,
    totalPrice: product.price * quantity
  };

  orders.push(newOrder);

  res.json({
    status: "success",
    order: newOrder
  });
});


app.get("/order", (req, res) => {
  res.json(orders);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
