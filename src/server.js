const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect('mongodb://127.0.0.1:27017/auth-db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: [String], required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true }
});

const Product = mongoose.model('Product', ProductSchema);

// Register route
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email: user.email }, 'secret', { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Profile route
app.get('/api/profile', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secret', async (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      const user = await User.findOne({ email: decoded.email });
      if (user) {
        res.json({ email: user.email });
      } else {
        res.sendStatus(404);
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// Products route
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    const normalizedProducts = products.map(product => ({
      ...product._doc,
      description: Array.isArray(product.description) ? product.description : [product.description]
    }));
    res.json(normalizedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
