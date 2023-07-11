"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.getTransactionsOfAUser = exports.getAllTransactions = exports.getTransactionById = exports.createTransaction = void 0;
const uuid_1 = require("uuid");
const accounts_1 = __importDefault(require("../models/accounts"));
const transactions_1 = __importDefault(require("../models/transactions"));
const createTransaction = async (req, res, next) => {
    try {
        const idNew = (0, uuid_1.v4)();
        const { amount, channel, transaction_type, narration, sender_account_number, currency_code, receiver_account_number, } = req.body;
        let accountBalance;
        let findAccount;
        let previousAccountBal;
        if (transaction_type === 'credit') {
            findAccount = await accounts_1.default.findOne({ where: { account_number: receiver_account_number } });
            previousAccountBal = findAccount.account_balance;
            accountBalance = findAccount.account_balance + amount;
            findAccount.account_balance = accountBalance;
        }
        else {
            findAccount = await accounts_1.default.findOne({ where: { account_number: sender_account_number } });
            previousAccountBal = findAccount.account_balance;
            accountBalance = findAccount.account_balance - amount;
            findAccount.account_balance = accountBalance;
        }
        //   if(!findAccount){
        //     return res.status(404).json({
        //         message: `Sender's account does not exist`
        //     })
        //   }
        if (findAccount.status !== 'active')
            return res.status(404).json({
                message: `Account has been deactivated`
            });
        // let currentAccountBalance = findAccount.account_balance;
        // let newAccountBalance = 0;
        const newTransaction = await transactions_1.default.create({
            id: idNew,
            amount,
            channel,
            transaction_type,
            narration,
            sender_account_number,
            currency_code,
            receiver_account_number,
            transaction_date: new Date(),
            transaction_status: "successful"
        });
        if (newTransaction) {
            await findAccount.update({
                account_balance: accountBalance
            });
            return res.status(200).json({
                message: `Transaction successful`,
                account_name: findAccount.account_name,
                previous_account_balanace: previousAccountBal,
                new_account_balanace: findAccount.account_balance,
                findAccount,
                newTransaction
            });
        }
        else {
            return res.status(401).json({ transaction_status: 'unsuccessful' });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};
exports.createTransaction = createTransaction;
const getTransactionById = async (req, res, next) => {
    try {
        const idCheck = req.params.id;
        const transaction = await transactions_1.default.findOne({ where: { id: idCheck } });
        if (!transaction)
            return res.status(404).json({ message: `Transaction not found` });
        return res.status(200).json({ message: `Transaction found`, data: transaction });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};
exports.getTransactionById = getTransactionById;
const getAllTransactions = async (req, res, next) => {
    try {
        let transactionz = await transactions_1.default.findAll({});
        if (!transactionz)
            return res.status(404).json({ message: `Unable to fetch data` });
        return res.status(200).json({ message: `Transactions fetched`, data: transactionz });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};
exports.getAllTransactions = getAllTransactions;
const getTransactionsOfAUser = async (req, res, next) => {
    try {
        const accnt = Number(req.query.account_number);
        const userAccount = await accounts_1.default.findOne({ where: { account_number: accnt } });
        if (!userAccount) {
            return res.status(404).json({
                message: `Account does not exist`
            });
        }
        const sentTransactions = await transactions_1.default.findAll({ where: { sender_account_number: userAccount.account_number } });
        const receivedTransactions = await transactions_1.default.findAll({ where: { receiver_account_number: userAccount.account_number } });
        if (!sentTransactions && !receivedTransactions) {
            return res.status(404).json({
                message: `Transactions do not exist`
            });
        }
        return res.status(200).json({
            message: `Transactions successfully fetched`,
            Account: userAccount,
            deposits: receivedTransactions,
            withdrawals: sentTransactions
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};
exports.getTransactionsOfAUser = getTransactionsOfAUser;
const deleteTransaction = async (req, res, next) => {
    try {
        const transId = req.params.id;
        const findTrans = await transactions_1.default.findOne({ where: { id: transId } });
        if (!findTrans) {
            return res.status(404).json({
                message: `Transaction not found`
            });
        }
        const del = await transactions_1.default.destroy({ where: { id: transId } });
        if (!del)
            return res.status(404).json({ message: `Unable to delete` });
        const allTrans = await transactions_1.default.findAll({});
        return res.status(200).json({
            message: `Transaction deleted successfully`,
            Transactions: allTrans
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};
exports.deleteTransaction = deleteTransaction;
