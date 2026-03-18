const express = require('express');
const { createClient } = require('redis');
const cors = require('cors');

const app = express();
const USE_REDIS = true;
const client = USE_REDIS ? createClient() : null;

if (USE_REDIS) {
  client.connect();
}

app.use(cors({
  origin: 'http://localhost:5173',
  exposedHeaders: ['X-Cache', 'X-Cache-Status']
}));
let cacheHits = 0;
let cacheMisses = 0;

app.get('/api/data', async (req, res) => {
  const cached = USE_REDIS ? await client.get('data') : null;

  if (cached) {
    cacheHits++;
    res.set('X-Cache', 'HIT');
    return res.json({ source: 'cache', data: JSON.parse(cached) });
  }

  cacheMisses++;

  const data = { message: 'data', ts: Date.now() };
  await new Promise(r => setTimeout(r, 500)); // simulate slow backend

  if (USE_REDIS) {
    await client.set('data', JSON.stringify(data), { EX: 10 });
  }
  res.set('X-Cache', cached ? 'HIT' : 'MISS');
  res.json({ source: 'server', data });
});

app.get('/metrics', (req, res) => {
  res.json({ cacheHits, cacheMisses });
});

app.listen(3000, () => {
  console.log(`Server ${USE_REDIS ? 'with Redis' : 'without Redis'} on port 3000`);
});