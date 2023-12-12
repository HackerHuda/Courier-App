import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(json());


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
import { post } from 'axios';

const OPENAI_API_KEY = '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'; 

app.post('/generate-response', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt,
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    res.json({ response: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
