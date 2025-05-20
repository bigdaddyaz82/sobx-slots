const express = require('express');
const app = express();
app.use(express.json());

// Mock user balance (replace with real DB in future)
let userBalance = 1000; 

// Slot symbols & payouts example
const symbols = ['7', 'BAR', '8-Ball', 'Cherry', 'Bell'];
const payouts = {
  '7-7-7': 100,   // Jackpot
  '8-Ball-8-Ball-8-Ball': 50,
  'BAR-BAR-BAR': 30,
  // partial matches can pay small amounts (handle in logic)
};

function spinReels() {
  let reel1 = symbols[Math.floor(Math.random() * symbols.length)];
  let reel2 = symbols[Math.floor(Math.random() * symbols.length)];
  let reel3 = symbols[Math.floor(Math.random() * symbols.length)];
  return [reel1, reel2, reel3];
}

function calculateWinnings(spinResult, bet) {
  const combo = spinResult.join('-');
  if (payouts[combo]) {
    return payouts[combo] * bet;
  }
  // partial payout example: 2 matching symbols pays half bet
  const [r1, r2, r3] = spinResult;
  if (r1 === r2 || r2 === r3 || r1 === r3) {
    return bet * 0.5; // small win for 2 matches
  }
  return 0; // no win
}

app.post('/api/spin', (req, res) => {
  const bet = Number(req.body.bet);
  if (!bet || bet < 1) {
    return res.status(400).json({ error: 'Invalid bet amount' });
  }
  if (bet > userBalance) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  // Deduct bet from balance (house edge: 80% kept)
  userBalance -= bet;

  const spinResult = spinReels();
  const grossWin = calculateWinnings(spinResult, bet);

  // House takes 80%, payout is 20% of gross win
  const payout = grossWin * 0.2;

  userBalance += payout; // add winnings

  res.json({
    spinResult,
    bet,
    payout,
    balance: userBalance,
    message: payout > 0 ? `Congrats! You won ${payout} SOBEX!` : 'No win this time. Try again!',
  });
});

app.listen(3000, () => console.log('Sobex Slots backend running on port 3000'));
