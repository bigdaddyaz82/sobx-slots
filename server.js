const path = require('path');
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// --- BEGIN DEBUGGING FILE STRUCTURE ---
const baseDir = __dirname; // This will be /opt/render/project/ on Render (project root)
console.log(`[DEBUG] Server starting. Current directory (__dirname): ${baseDir}`);

try {
  const itemsInBaseDir = fs.readdirSync(baseDir);
  console.log(`[DEBUG] Items in ${baseDir}:`, itemsInBaseDir);
} catch (e) {
  console.error(`[DEBUG] Error reading base directory ${baseDir}:`, e.message);
}

// EXPECT 'public' DIRECTORY AT THE PROJECT ROOT
const publicDirPath = path.join(baseDir, 'public');
console.log(`[DEBUG] Expected path for 'public' directory: ${publicDirPath}`);

try {
  const publicDirStats = fs.statSync(publicDirPath);
  if (publicDirStats.isDirectory()) {
    console.log(`[DEBUG] '${publicDirPath}' exists and IS a directory.`);
    try {
      const itemsInPublicDir = fs.readdirSync(publicDirPath);
      console.log(`[DEBUG] Items in ${publicDirPath}:`, itemsInPublicDir);
    } catch (e) {
      console.error(`[DEBUG] Error reading contents of ${publicDirPath}:`, e.message);
    }
  } else {
    console.log(`[DEBUG] '${publicDirPath}' exists BUT IS NOT A DIRECTORY. This is likely the problem!`);
  }
} catch (e) {
  console.error(`[DEBUG] Error accessing '${publicDirPath}': ${e.message}`);
  if (e.code === 'ENOENT') {
    console.error(`[DEBUG] CRITICAL: The directory '${publicDirPath}' DOES NOT EXIST.`);
  }
}
// --- END DEBUGGING FILE STRUCTURE ---

app.use(cors());
app.use(express.json());

// Serve static files from 'public' folder (at the project root)
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/spin', (req, res) => {
  // ... (your API logic is fine)
  const numberOfReels = 3;
  const symbolsPerReel = 10;
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

// For any other route, serve index.html (from public/index.html at the project root)
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error(`Error sending file ${indexPath}:`, err.message);
      if (!res.headersSent) {
        res.status(err.status || 500).send(`Failed to serve the application. Error: ${err.code || 'UNKNOWN'}`);
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
