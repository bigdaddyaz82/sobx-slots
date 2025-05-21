const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Your existing API route with updated spin logic
app.post('/api/spin', (req, res) => {
  function getRandomDigit() {
    return Math.floor(Math.random() * 10); // 0 through 9
  }
  const result = [getRandomDigit(), getRandomDigit(), getRandomDigit()];
  res.json({ result });
});

// For any other route, serve index.html (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
