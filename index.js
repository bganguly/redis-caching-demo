const express = require('express');
const { createClient } = require('redis');

const app = express();
const client = createClient();
client.connect();

let cacheHits = 0;
let cacheMisses = 0;

app.get('/api/data', async (req, res) => {
  const cached = await client.get('data');

  if (cached) {
    cacheHits++;
    return res.json({ source: 'cache', data: JSON.parse(cached) });
  }

  cacheMisses++;

  const data = { message: 'data', ts: Date.now() };
  await new Promise(r => setTimeout(r, 500)); // simulate slow backend

  await client.set('data', JSON.stringify(data), { EX: 10 });
  res.set('X-Cache', cached ? 'HIT' : 'MISS');
  res.json({ source: 'server', data });
});

app.get('/metrics', (req, res) => {
  res.json({ cacheHits, cacheMisses });
});

app.listen(3000, () => console.log('Server with Redis on port 3000'));