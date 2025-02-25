const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  date: Date,
  duration: Number,
  appointmentType: String,
  patientName: String,
  notes: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);
