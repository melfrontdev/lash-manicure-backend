const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();

// Ver agendamentos
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
});

// Criar novo agendamento
router.post('/', async (req, res) => {
  const { clientName, date, time } = req.body;
  try {
    const newAppointment = new Appointment({ clientName, date, time });
    await newAppointment.save();
    res.status(201).json({ message: 'Agendamento criado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar agendamento' });
  }
});

module.exports = router;
