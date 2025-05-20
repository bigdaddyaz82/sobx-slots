const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Your existing API route
app.post('/api/spin', (req, res) => {
  // Your spin logic here
  const symbols = ['cherry', 'lemon', 'orange', 'seven', 'bar'];
  function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
  const result = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
  res.json({ result });
});

// For any other route, serve index.html (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
