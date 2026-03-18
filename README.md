# Redis Caching Demo for API Performance

This project demonstrates how adding a Redis cache improves API response times under load.

It simulates a slow backend and shows how caching reduces latency and improves scalability.
> ~8x improvement in latency under load
---

## 🧠 What This Project Shows

* Impact of caching on API latency
* Cache hit vs cache miss behavior
* Performance improvement under load
* Real-world pattern using Redis with Node.js

---

## ⚙️ Tech Stack

* Node.js (Express)
* Redis
* k6 (for load testing)

---

## 🏗️ Architecture

```
Client (k6)
    ↓
Node API (Express)
    ↓
Redis Cache
```

---

## 🚀 How It Works

### Without Cache

* Every request hits the backend
* Artificial delay simulates slow processing
* Higher latency under load

### With Cache

* First request → cache miss (slow)
* Subsequent requests → cache hit (fast)
* Data stored in Redis with TTL

---

## 🧪 Load Testing Setup

Load testing performed using k6:

* Virtual Users: 50
* Duration: 10 seconds
* Endpoint: `/api/data`

---

## 📊 Results

### ❌ Without Cache

* Average latency: **505 ms**
* Behavior: All requests hit backend

---

### ✅ With Redis Cache

* Average latency: **55.27 ms**
* Behavior:

  * Initial requests: cache miss
  * Subsequent requests: cache hit

---

## 📈 Performance Improvement

Caching reduced latency by approximately:

> **<X>x faster response time**

---

## 🔍 Example Response

```json
{
  "message": "data",
  "ts": 1710000000000
}
```

---

## ⏱️ Cache Details

* TTL: 10 seconds
* Key: `data`
* Strategy: Cache-aside

---

## ▶️ How to Run

### 1. Start Redis

```bash
brew services start redis
```

---

### 2. Start Server

```bash
node index.js
```

---

### 3. Run Load Test

```bash
k6 run load.js
```

---

## 🧭 Key Takeaways

* Caching dramatically reduces backend load
* Improves response time under concurrent traffic
* Simple to implement, high impact
* Common pattern in production systems

---

## 📌 Future Improvements

* Add cache invalidation strategies
* Use distributed caching
* Add metrics dashboard (Grafana)
* Introduce CDN layer

---

## 👤 Author

Built as part of a scalability and performance engineering series.
