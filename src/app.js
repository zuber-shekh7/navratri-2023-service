import express from 'express';

const app = express();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;