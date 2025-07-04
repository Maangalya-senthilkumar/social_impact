const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('API is running');
});
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});