const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  workingHours: {
    start: String,
    end: String
  },
  specialization: String
});

module.exports = mongoose.model('Doctor', doctorSchema);
