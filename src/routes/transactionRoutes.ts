import express from 'express';
import {createTransaction, getTransactionById, 
    getTransactionsOfAUser, getAllTransactions} from '../controllers/transactions'
const router = express.Router();

router.post('/create', createTransaction)
router.get('/getbyid/:id', getTransactionById)
router.get('/getall', getAllTransactions)
router.get('/usertransaction/:id', getTransactionsOfAUser)

export default router

//1234567890