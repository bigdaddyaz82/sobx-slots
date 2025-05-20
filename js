// Example JavaScript for spin button click
document.getElementById('spinButton').addEventListener('click', async () => {
  // Get bet amount from your bet buttons (e.g. 1, 5, or 10 Sobex)
  const betAmount = getSelectedBetAmount(); // You'll need to implement this part

  try {
    const response = await fetch('https://your-backend-url/api/spin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bet: betAmount }),
    });

    if (!response.ok) throw new Error('Spin failed');

    const data = await response.json();
    // data will have spin result info from backend

    updateUIWithSpinResult(data); // Implement this to show spin wheels, winnings, balances, etc.

  } catch (error) {
    console.error('Error spinning:', error);
    alert('Something went wrong, try again later.');
  }
});
