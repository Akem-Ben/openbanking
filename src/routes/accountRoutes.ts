import express from 'express';
import {createAccount, getSingleAccount, 
    getAllAccounts, updateAccountDetails, 
    reactivateAccount, deactivateAccount, 
    getAccountBalance, deleteAccount} from '../controllers/accounts'
const router = express.Router();

router.post('/create', createAccount)
router.get('/getsingle/', getSingleAccount)
router.get('/getall', getAllAccounts)
router.put('/deactivate/:account_number', deactivateAccount)
router.put('/update/:account_number', updateAccountDetails)
router.put('/reactivate/:account_number', reactivateAccount)
router.delete('/delete/:account_number', deleteAccount)
router.get('/accountbalance/', getAccountBalance)

export default router