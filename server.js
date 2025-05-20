const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Slot symbols used by frontend
const symbols = ['cherry', 'lemon', 'orange', 'seven', 'bar'];

// Utility to pick a random symbol
function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// POST /api/spin endpoint
app.post('/api/spin', (req, res) => {
  const user = req.body.user;

  if (!user) {
    return res.status(400).json({ error: 'User address is required' });
  }

  // Generate 3 random symbols for the spin result
  const result = [
    getRandomSymbol(),
    getRandomSymbol(),
    getRandomSymbol()
  ];

  // Here you could add your betting logic, payouts, etc.

  // Return spin result
  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
