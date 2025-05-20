const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const symbols = ['cherry', 'lemon', 'orange', 'seven', 'bar'];

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

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

app.use(express.static(path.join(__dirname, '/')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
