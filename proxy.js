// // javascript
// import NotionAPICall from './notion';

// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const app = express();

// app.use('/api',createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true }));
// app.listen(3001);

// // http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar

require('dotenv').config();
const NotionAPICall = require("./notion");
const https = require("https");
const fs = require('fs');
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;

app.use(cors());

const corsOptions = {
  origin: "htts://www.georgez.dev", 
  optionsSuccessStatus: 200,
};

// Load SSL certificate and private key
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: process.env.HTTPS_PASSPHRASE
};

app.use(cors(corsOptions));



// Define the /api endpoint
app.get("/api", async (req, res) => {
  const notionBlocks = await NotionAPICall().then((a) => {
    // console.log(a);
    res.send(a);
  });
});

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// Create HTTPS server
https.createServer(options, app).listen(443, () => {
  console.log('Server running on https://localhost:443');
});