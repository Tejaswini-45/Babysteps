const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const { format } = require('date-fns');

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors' });
  }
});

router.get('/:id/slots', async (req, res) => {
  try {
    const doctorId = req.params.id;
    const date = req.query.date;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const start = new Date(`${date}T${doctor.workingHours.start}:00`);
    const end = new Date(`${date}T${doctor.workingHours.end}:00`);
    const duration = 30; // minutes

    const appointments = await Appointment.find({ doctorId, date: { $gte: start, $lt: end } });
    const slots = [];

    for (let time = start; time < end; time.setMinutes(time.getMinutes() + duration)) {
      const slotStart = format(time, 'HH:mm');
      const slotEnd = format(new Date(time.getTime() + duration * 60 * 1000), 'HH:mm');
      const isAvailable = !appointments.some(appointment => {
        const appointmentStart = appointment.date;
        const appointmentEnd = new Date(appointmentStart.getTime() + appointment.duration * 60 * 1000);
        return (time >= appointmentStart && time < appointmentEnd) || (time < appointmentStart && time + duration * 60 * 1000 > appointmentStart);
      });

      if (isAvailable) {
        slots.push({ start: slotStart, end: slotEnd });
      }
    }

    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slots' });
  }
});

module.exports = router;
