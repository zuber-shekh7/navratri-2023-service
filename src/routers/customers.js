import express from 'express';
import { sendOtp, verifyOtp, getCustomer } from '../controllers/customers.js';
import authMiddleware from '../middlewares/auth.js'

const router = express.Router();

// POST /customers/auth/otp/send
router.post('/auth/otp/send', sendOtp);

// POST /customers/auth/otp/verify
router.post('/auth/otp/verify', verifyOtp);

// GET /customers/:id
router.get('/:id', authMiddleware, getCustomer);

export default router;