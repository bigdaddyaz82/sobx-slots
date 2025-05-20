const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS so frontend can talk to backend if separate origins
app.use(cors());

// Serve static frontend files from root
app.use(express.static(path.join(__dirname)));

// Parse JSON bodies for POST requests
app.use(express.json());

// Spin endpoint — this is where the spin logic happens
app.post('/api/spin', (req, res) => {
  // Simulate slot machine spin results
  const slots = ['🍎', '🍌', '🍒', '🍇', '7️⃣'];
  
  // Generate three random results
  const result = [];
  for (let i = 0; i < 3; i++) {
    const randIndex = Math.floor(Math.random() * slots.length);
    result.push(slots[randIndex]);
  }

  // Send the spin results back to frontend
  res.json({ success: true, result });
});

// For SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
