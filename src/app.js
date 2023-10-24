import express from 'express';
import customersRoutes from './routers/customers.js';

const app = express();

app.use(express.json());

app.use('/customers', customersRoutes);

export default app;