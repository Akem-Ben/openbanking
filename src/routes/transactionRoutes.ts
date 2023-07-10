import express from 'express';
import {createTransaction, getTransactionById, 
    getTransactionsOfAUser, deleteTransaction, getAllTransactions} from '../controllers/transactions'
const router = express.Router();

router.post('/create', createTransaction)
router.get('/getbyid/:id', getTransactionById)
router.get('/getall', getAllTransactions)
router.get('/usertransaction/', getTransactionsOfAUser)
router.delete('/delete/:id', deleteTransaction)

export default router

//1234567890