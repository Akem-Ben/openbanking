import express from 'express';
import {createTransaction} from '../controllers/transactions'
const router = express.Router();

router.post('/create', createTransaction)

export default router

//1234567890