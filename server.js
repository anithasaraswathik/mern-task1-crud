
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Temporary array to store items
let items = [
  { id: 1, name: "Book", price: 250 },
  { id: 2, name: "Pen", price: 25 }
];

let nextId = 3;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// READ: Get all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// CREATE: Add an item
app.post("/api/items", (req, res) => {
  const { name, price } = req.body;

  if (!name || !String(name).trim() || price === "" ||
      price === undefined || !Number.isFinite(Number(price)) ||
      Number(price) < 0) {
    return res.status(400).json({ message: "Enter a valid name and price." });
  }

  const item = {
    id: nextId++,
    name: String(name).trim(),
    price: Number(price)
  };

  items.push(item);
  res.status(201).json(item);
});

// UPDATE: Edit an item
app.put("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((entry) => entry.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found." });
  }

  const { name, price } = req.body;

  if (!name || !String(name).trim() || price === "" ||
      price === undefined || !Number.isFinite(Number(price)) ||
      Number(price) < 0) {
    return res.status(400).json({ message: "Enter a valid name and price." });
  }

  item.name = String(name).trim();
  item.price = Number(price);

  res.json(item);
});

// DELETE: Remove an item
app.delete("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex((entry) => entry.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found." });
  }

  items.splice(index, 1);
  res.json({ message: "Item deleted successfully." });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
