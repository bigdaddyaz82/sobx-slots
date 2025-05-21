document.addEventListener('DOMContentLoaded', () => {
  const connectButton = document.getElementById('connectButton');

  connectButton.addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0];

        // Get selected token type and badge (NEW)
        const tokenType = document.querySelector('input[name="tokenType"]:checked')?.value || 'Apple Conyer Coin';
        const badgeType = document.querySelector('input[name="badgeType"]:checked')?.value || 'Adge Badge';

        // Update DOM
        document.getElementById('walletAddress').textContent = `Connected to wallet: ${walletAddress}`;
        document.getElementById('rewardMessage').textContent = `You've been awarded 10 ${tokenType} and 5 ${badgeType}!`;

        // Send to backend
        const response = await fetch('/connect-wallet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress, tokenType, badgeType }),
        });

        const data = await response.json();
        console.log(data.message);
      } catch (err) {
        console.error('Wallet connection failed:', err);
        alert('Failed to connect wallet.');
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  });
});
