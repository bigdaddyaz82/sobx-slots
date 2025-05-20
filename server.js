const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '/')));

// Spin API endpoint
app.get('/spin', (req, res) => {
  const wheels = [
    Math.floor(Math.random() * 7), // 0 to 6
    Math.floor(Math.random() * 7),
    Math.floor(Math.random() * 7),
  ];
  res.json({ success: true, wheels });
});

// SPA fallback route (send index.html on unknown routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
