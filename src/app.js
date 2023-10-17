import express from 'express';
import User from './models/user.js'

const app = express();

// Define a simple route
app.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Use the find method with no criteria to get all users
    res.json(users); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default app;