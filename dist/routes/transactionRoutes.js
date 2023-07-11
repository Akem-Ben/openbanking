"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactions_1 = require("../controllers/transactions");
const router = express_1.default.Router();
router.post('/create', transactions_1.createTransaction);
router.get('/getbyid/:id', transactions_1.getTransactionById);
router.get('/getall', transactions_1.getAllTransactions);
router.get('/usertransaction/', transactions_1.getTransactionsOfAUser);
router.delete('/delete/:id', transactions_1.deleteTransaction);
exports.default = router;
//1234567890
