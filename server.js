// server.js
const express = require('express');
const cors = require('cors');
const appointmentsRouter = require('./routes/appointments');
const authRouter = require('./routes/auth');
const sequelize = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/appointments', appointmentsRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Testar a conexão com o banco
sequelize.sync();
