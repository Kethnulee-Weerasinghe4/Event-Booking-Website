// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' })); // allow frontend
app.use(express.json());

let events = [
  { id: 1, title: "Tech Conference 2025", date: "2025-11-10", location: "Colombo" },
  { id: 2, title: "Music Festival", date: "2025-12-01", location: "Kandy" }
];

app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/book', (req, res) => {
  const booking = req.body;
  // In a real app, save to DB. For now just echo:
  console.log('New booking:', booking);
  res.status(201).json({ message: 'Booking confirmed!', booking });
});

app.listen(PORT, () => {
  console.log(`Backend listening at http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Backend is running!');
});
