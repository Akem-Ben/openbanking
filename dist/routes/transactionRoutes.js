"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactions_1 = require("../controllers/transactions");
const router = express_1.default.Router();
// router.post('/create', createTransaction)
// router.get('/getbyid/:id', getTransactionById)
// router.get('/getall', getAllTransactions)
router.get('/usertransaction/', transactions_1.getTransactionsOfAUser);
// router.delete('/delete/:id', deleteTransaction)
exports.default = router;
//1234567890
