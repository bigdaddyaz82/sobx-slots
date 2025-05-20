const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Your slot machine symbols
const symbols = ['cherry', 'lemon', 'orange', 'seven', 'bar'];

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Slot machine logic
function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// API route to spin
app.post('/api/spin', (req, res) => {
  const user = req.body.user;
  if (!user) return res.status(400).json({ error: 'User address is required' });

  const result = [
    getRandomSymbol(),
    getRandomSymbol(),
    getRandomSymbol()
  ];

  res.json({ result });
});

// Fallback to serve index.html on unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
