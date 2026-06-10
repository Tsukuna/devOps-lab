const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const todoRoutes = require('./routes/todo');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/todos', todoRoutes);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello From Node' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});