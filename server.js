const path = require('path');
const express = require('express');
const cors = require('cors');
const crypto = require('crypto'); // Import the crypto module
// const fs = require('fs'); // You could use this for deeper debugging if needed

const app = express();
const PORT = process.env.PORT || 3000; // Correct for Render

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
// This middleware will automatically look for 'index.html' in 'public' for requests to '/'
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/spin', (req, res) => {
  const numberOfReels = 3;
  const symbolsPerReel = 10; // Represents symbols 0 through 9
  const result = [];

  try {
    for (let i = 0; i < numberOfReels; i++) {
      const randomNumber = crypto.randomInt(symbolsPerReel);
      result.push(randomNumber);
    }
    res.json({ result });
  } catch (error) {
    console.error("Error generating spin result:", error);
    res.status(500).json({ error: "Failed to generate spin. Please try again." });
  }
});

// Fallback for any other route: serve index.html
// This is important for Single Page Applications (SPAs) or if express.static doesn't catch a direct '/'
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  
  // Optional: Log the path being accessed, helps in debugging on Render
  console.log(`Attempting to serve index.html from: ${indexPath}`);

  res.sendFile(indexPath, (err) => {
    if (err) {
      // This block will execute if res.sendFile encounters an error AFTER successfully finding the file initially
      // or if the path itself is problematic in a way that Express didn't catch earlier.
      // The ENOTDIR error specifically means the path to the directory ('public') is the issue.
      console.error(`Error sending file ${indexPath}:`, err);
      
      // Send a more specific error status if available, otherwise 500
      if (err.status) {
        res.status(err.status).send(`Error sending file: ${err.message}`);
      } else {
        res.status(500).send(`Internal Server Error: ${err.message}`);
      }
    } else {
      console.log(`Successfully sent ${indexPath}`);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
