// slotMachineLogic.js

// Symbols and their weights (higher weight = more common)
const symbols = [
  { symbol: '7', weight: 5, payout: 100 },      // Jackpot
  { symbol: '8-ball', weight: 10, payout: 50 },
  { symbol: 'cherry', weight: 15, payout: 20 },
  { symbol: 'lemon', weight: 20, payout: 10 },
  { symbol: 'bar', weight: 25, payout: 5 },
  { symbol: 'blank', weight: 100, payout: 0 },  // No win
];

// Total weight calculation
const totalWeight = symbols.reduce((sum, s) => sum + s.weight, 0);

// Function to pick one symbol based on weights
function spinWheel() {
  const rand = Math.random() * totalWeight;
  let sum = 0;
  for (const s of symbols) {
    sum += s.weight;
    if (rand <= sum) {
      return s;
    }
  }
}

// Spin the 3 wheels
function spin(betAmount) {
  if (![1, 5, 10].includes(betAmount)) {
    throw new Error('Invalid bet amount. Must be 1, 5, or 10 SOBX.');
  }

  const reel1 = spinWheel();
  const reel2 = spinWheel();
  const reel3 = spinWheel();

  const reels = [reel1, reel2, reel3];

  // Check for matching symbols
  const allMatch = reel1.symbol === reel2.symbol && reel2.symbol === reel3.symbol;

  let payout = 0;

  if (allMatch) {
    // Big win for 3 in a row
    payout = reel1.payout * betAmount;
  } else {
    // Partial win if any 2 symbols match
    const counts = {};
    reels.forEach(r => counts[r.symbol] = (counts[r.symbol] || 0) + 1);

    // Find if any symbol count is 2
    const twoMatchSymbol = Object.keys(counts).find(key => counts[key] === 2);

    if (twoMatchSymbol) {
      // Pay smaller reward for two matches
      const symbolObj = symbols.find(s => s.symbol === twoMatchSymbol);
      payout = Math.floor((symbolObj.payout / 4) * betAmount); // 25% payout for two matches
    }
  }

  return {
    reels: reels.map(r => r.symbol),
    payout,
  };
}

// Export functions
module.exports = {
  spin,
};
