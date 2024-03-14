const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Change this to your desired port

app.use(bodyParser.json());
const transcriptions = []; // Store transcriptions in memory (replace with a database in production)

// Enable CORS for cross-origin requests (adjust origin as needed)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route for recording transcriptions
app.post('/record', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required.' });
  }
  
  const transcription = { text, timestamp: new Date() };
  transcriptions.push(transcription);
  
  res.status(201).json({ message: 'Transcription recorded successfully' });
});

// Route for retrieving transcriptions
app.get('/transcriptions', (req, res) => {
  res.json(transcriptions);
});

app.listen(port, () => {
  console.log('Server is running on port ${port}');
});