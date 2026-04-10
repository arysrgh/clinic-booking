const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const regionRoutes = require('./routes/regions');
app.use('/regions', regionRoutes);

app.get('/test', (req, res) => {
  res.send("OK");
});

app.get('/healthz', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

const slotRoutes = require('./routes/slots');
app.use('/appointment-slots', slotRoutes);

const encounterRoutes = require('./routes/encounters');
app.use('/encounters', encounterRoutes);
