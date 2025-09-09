const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const app = express();
const port = 5000;

// Add CORS middleware
app.use(cors());

const config = {
  host: process.env.DB_HOST || 'db',  // note: use 'db' as host because of docker-compose service name
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'testdb',
  port: process.env.DB_PORT || 5432,
};

// Function to try connecting to the database
const connectWithRetry = async () => {
  const client = new Client(config);
  try {
    await client.connect();
    console.log('Connected to Postgres');
    return client;
  } catch (err) {
    console.error('Failed to connect to Postgres, retrying in 5 seconds...', err);
    await new Promise(resolve => setTimeout(resolve, 5000));
    return connectWithRetry();
  }
};

// Start trying to connect and store the client
let dbClient = null;

// Root endpoint
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// API endpoint that uses the database
app.get('/api', async (req, res) => {
  try {
    if (!dbClient) {
      dbClient = await connectWithRetry();
    }
    const result = await dbClient.query('SELECT NOW() AS time');
    res.json({
      message: 'Hello from Express + Postgres!',
      serverTime: result.rows[0].time
    });
  } catch (err) {
    console.error('DB query error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start the server and initialize database
app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening at http://localhost:${port}`);
  // Initialize database connection
  connectWithRetry().then(client => {
    dbClient = client;
  }).catch(err => {
    console.error('Initial database connection failed:', err);
  });
});
