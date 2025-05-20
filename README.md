# SOBX Slots Backend

This is the backend logic for the SOBX Slots game — a simple crypto slot machine with betting options.

## Features

- Weighted reels for realistic odds
- Bet amounts: 1, 5, or 10 SOBX per spin
- Big payout for 3 matching symbols
- Smaller payout for 2 matching symbols
- Simple interface to integrate with frontend or blockchain

## Usage

Import the `spin` function and call it with your bet amount:

```js
const { spin } = require('./slotMachineLogic');

const result = spin(5); // Bet 5 SOBX
console.log(result);
// Example output: { reels: ['cherry', 'cherry', 'lemon'], payout: 25 }
