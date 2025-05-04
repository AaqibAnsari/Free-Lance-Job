const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Importing routes
app.use('/api/auth', require('./routes/authRoutes'));
//app.use('/api/profile', require('./routes/freelancerRoutes'));
app.use('/api/freelancer', require('./routes/frRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/proposals',require('./routes/proposalRoutes'))
app.use('/api/gemini', require('./routes/gemini'));
// Default route
app.get('/', (req, res) => res.json({ message: 'API Working!' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
