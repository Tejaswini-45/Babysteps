const express = require('express');
const mongoose = require('mongoose');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/prenatalcare', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);

const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
