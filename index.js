const express = require('express');
const { createClient } = require('redis');

const app = express();
const client = createClient();
client.connect();

app.get('/api/data', async (req, res) => {
  const cached = await client.get('data');

  if (cached) {
    return res.json({ source: 'cache', data: JSON.parse(cached) });
  }

  // simulate slow DB
  await new Promise(r => setTimeout(r, 200));
  const data = { message: 'data' };

  await client.set('data', JSON.stringify(data), { EX: 60 });

  res.json({ source: 'db', data });
});

app.listen(3000, () => console.log('Server with Redis'));