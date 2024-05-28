import express from 'express';
import axios from 'axios';
import { z } from 'zod';

const app = express();
const PORT = 3000;


const querySchema = z.object({
  amount: z
    .number()
    .int()
    .min(2, { message: 'Amount must be at least 2' })
    .max(10, { message: 'Amount must not exceed 10' })
    .transform(value => typeof value === 'string' ? parseInt(value, 10) : value)
    .optional(),
});

async function fetchJokes(amount) {
  try {
    const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?amount=${amount}`);
    return response.data.jokes;
  } catch (error) {
    console.error('Error fetching jokes:', error);
    return [];
  }
}

app.get('/jokes', async (req, res) => {
  // Validate the query parameters using Zod
  const parsedQuery = querySchema.safeParse(req.query);

  if (!parsedQuery.success) {
    // If validation fails, send a 400 error with the validation message
    return res.status(400).json({ error: parsedQuery.error.errors });
  }

  const { amount = 5 } = parsedQuery.data; // Default to 5 jokes if amount is not specified

  const jokes = await fetchJokes(amount);
  res.json(jokes);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.get('/',(req,res)=>{
  res.json({'hacked':'Soumik was here!'})
})

