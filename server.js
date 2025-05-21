const path = require('path');
const express = require('express');
const cors = require('cors');
const crypto = require('crypto'); // Import the crypto module

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from 'public' folder
// Assuming your slots.html is renamed to index.html and is in a 'public' subfolder
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/spin', (req, res) => {
  // For your slot machine, let's assume symbols are numbers 0-9 for simplicity.
  // You can map these numbers to actual symbols (cherries, 7s, etc.) on the frontend or backend.
  const numberOfReels = 3;
  const symbolsPerReel = 10; // Represents symbols 0 through 9

  const result = [];
  try {
    for (let i = 0; i < numberOfReels; i++) {
      // crypto.randomInt(max) generates a random integer between 0 (inclusive) and max (exclusive).
      // So, crypto.randomInt(10) will generate numbers from 0 to 9.
      const randomNumber = crypto.randomInt(symbolsPerReel);
      result.push(randomNumber);
    }
    // At this point, the backend knows the result.
    // In a real system, you would now:
    // 1. Verify if the user can spin (e.g., has balance, session is valid).
    // 2. Deduct bet amount from user's balance in the database.
    // 3. Determine if 'result' is a winning combination based on your game's paytable.
    // 4. If it's a win, calculate the payout and add it to the user's balance in the database.
    // 5. Log the spin details (user, bet, result, win/loss, payout) in the database.

    // For now, we just return the result
    res.json({ result });

  } catch (error) {
    console.error("Error generating spin result:", error);
    // It's good practice to not send detailed internal errors to the client in production.
    res.status(500).json({ error: "Failed to generate spin. Please try again." });
  }
});

// For any other route, serve index.html (SPA fallback)
// Ensure your main slot machine HTML is named 'index.html' and is in the 'public' directory.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
