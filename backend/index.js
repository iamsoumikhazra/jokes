import express from 'express';
import axios from 'axios';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 8000;

async function fetchJokes(amount = 5) {
  try {
    const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?amount=${amount}`);
    return response.data.jokes;
  } catch (error) {
    console.error('Error fetching jokes:', error);
    return [];
  }
}

app.get('/api/jokes', async (req, res) => {
  try {
    let amount = parseInt(req.query.amount, 10); // Parse amount as integer
    if (isNaN(amount)) {
      amount = 5; // Default to 5 jokes if amount is not specified or invalid
    } else {
      // Clamp amount to be between 2 and 10
      amount = Math.max(2, Math.min(10, amount));
    }

    const jokes = await fetchJokes(amount);
    res.json(jokes);
  } catch (error) {
    console.error('Error in /api/jokes endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch jokes' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', async (req, res) => {
  try {
    res.json({ hacked: 'Soumik was here!' });
  } catch (error) {
    console.error('Error in / endpoint:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});
