// Load environment variables from .env file (make sure you have this file locally and it's in your .gitignore)
require('dotenv').config();

// Access your secret API key safely from environment variables
const apiKey = process.env.API_KEY;

// --- Slot Machine Setup ---

// Minimum bet and maximum bet options
const BET_OPTIONS = [1, 5, 10];

// Possible slot symbols
const SLOT_SYMBOLS = ['7', '8-ball', 'cherry', 'bar', 'bell', 'lemon'];

// Function to simulate spinning the slot machine wheels
function spinSlots() {
  let result = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * SLOT_SYMBOLS.length);
    result.push(SLOT_SYMBOLS[randomIndex]);
  }
  return result;
}

// Function to calculate payout based on spin result and bet amount
function calculatePayout(spinResult, betAmount) {
  // Big win: all three symbols match
  if (spinResult[0] === spinResult[1] && spinResult[1] === spinResult[2]) {
    if (spinResult[0] === '7') {
      return betAmount * 100; // Jackpot for 7-7-7
    } else if (spinResult[0] === '8-ball') {
      return betAmount * 50;
    } else {
      return betAmount * 10;
    }
  }

  // Small win: any two symbols match
  if (
    spinResult[0] === spinResult[1] ||
    spinResult[1] === spinResult[2] ||
    spinResult[0] === spinResult[2]
  ) {
    return betAmount * 2;
  }

  // No win
  return 0;
}

// Function to play the slot machine, with bet validation
function playSlot(betAmount) {
  if (!BET_OPTIONS.includes(betAmount)) {
    throw new Error('Invalid bet amount');
  }

  const spinResult = spinSlots();
  const payout = calculatePayout(spinResult, betAmount);

  return {
    spinResult,
    payout,
  };
}

// Export the playSlot function and bet options
module.exports = {
  playSlot,
  BET_OPTIONS,
};
