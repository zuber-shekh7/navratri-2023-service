import app from './app.js'
import dotenv from 'dotenv'
import { connect } from './utils/database.js'

import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the .env file in the 'src' folder
dotenv.config({ path: join(__dirname,  '../.env') });

connect()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});