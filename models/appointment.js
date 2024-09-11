// models/appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['No Salão', 'A Domicílio'],
    required: true
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
