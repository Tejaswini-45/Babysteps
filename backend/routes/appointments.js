const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;
    const appointment = new Appointment({ doctorId, date, duration, appointmentType, patientName, notes });
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment' });
  }
});

module.exports = router;
