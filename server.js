const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('SOBX Slot backend is running!');
});

// Example spin API endpoint
app.post('/api/spin', (req, res) => {
  const { bet } = req.body;

  if (!bet || bet < 1) {
    return res.status(400).json({ error: 'Invalid bet amount' });
  }

  // Simple slot machine logic example:
  const symbols = ['🍒', '🍋', '🍊', '⭐', '7'];
  const spinResult = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    spinResult.push(symbols[randomIndex]);
  }

  // Determine payout (example: 7|7|7 pays 10x, else no payout)
  let payout = 0;
  let message = 'Better luck next time!';
  if (spinResult.every(symbol => symbol === spinResult[0])) {
    if (spinResult[0] === '7') {
      payout = bet * 10;
      message = 'Jackpot! You won 10x your bet!';
    } else {
      payout = bet * 2;
      message = `Nice! You matched all ${spinResult[0]}s! You win 2x your bet!`;
    }
  }

  // For now, pretend the user balance updates (you can add DB logic later)
  const balance = 1000 + payout - bet; // example starting balance 1000

  res.json({
    spinResult,
    payout,
    balance,
    message
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
