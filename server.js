const path = require('path');
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs'); // Import the 'fs' module for file system operations

const app = express();
const PORT = process.env.PORT || 3000;

// --- BEGIN DEBUGGING FILE STRUCTURE ---
const baseDir = __dirname; // This will be /opt/render/project/src/ on Render
console.log(`[DEBUG] Server starting. Current directory (__dirname): ${baseDir}`);

try {
  const itemsInBaseDir = fs.readdirSync(baseDir);
  console.log(`[DEBUG] Items in ${baseDir}:`, itemsInBaseDir);
} catch (e) {
  console.error(`[DEBUG] Error reading base directory ${baseDir}:`, e.message);
}

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
  // This catch block will run if 'public' does not exist (ENOENT) or other stat errors occur
  console.error(`[DEBUG] Error accessing '${publicDirPath}': ${e.message}`);
  if (e.code === 'ENOENT') {
    console.error(`[DEBUG] CRITICAL: The directory '${publicDirPath}' DOES NOT EXIST.`);
  } else if (e.code === 'ENOTDIR') {
    // This would mean baseDir itself or some part of its path is not a directory, highly unlikely for __dirname
    console.error(`[DEBUG] CRITICAL: A part of the path '${publicDirPath}' is a file, not a directory leading up to 'public'.`);
  }
}
// --- END DEBUGGING FILE STRUCTURE ---

app.use(cors());
app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/spin', (req, res) => {
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

// For any other route, serve index.html (SPA fallback)
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  // console.log(`Attempting to serve index.html from: ${indexPath}`); // Moved debug log for this to be less noisy after initial check
  res.sendFile(indexPath, (err) => {
    if (err) {
      // The ENOTDIR here is usually a symptom of 'public' not being a directory or 'public/index.html' being a dir
      console.error(`Error sending file ${indexPath}:`, err.message); // Log only message for brevity
      if (!res.headersSent) { // Check if headers already sent
        res.status(err.status || 500).send(`Failed to serve the application. Error: ${err.code}`);
      }
    }
    // else {
    //   console.log(`Successfully sent ${indexPath}`); // Can be noisy
    // }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
