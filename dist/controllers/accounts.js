"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.getAccountBalance = exports.reactivateAccount = exports.updateAccountDetails = exports.deactivateAccount = exports.getAllAccounts = exports.getSingleAccount = exports.createAccount = void 0;
const uuid_1 = require("uuid");
const accounts_1 = __importDefault(require("../models/accounts"));
const createAccount = async (req, res, next) => {
    try {
        const idNew = (0, uuid_1.v4)();
        const { first_name, last_name, bank_name, phone_number, email, bvn, currency_code, account_type, status, account_balance } = req.body;
        const setAccountNumber = await accounts_1.default.findAll({});
        let newAccntNumber = 0;
        let accntArray = [];
        let maxAccnt = 0;
        if (setAccountNumber.length === 0) {
            newAccntNumber = 1111111110;
        }
        else {
            for (let i = 0; i < setAccountNumber.length; i++) {
                accntArray.push(setAccountNumber[i].account_number);
            }
            maxAccnt = Math.max(...accntArray);
            newAccntNumber = maxAccnt + 1;
        }
        const account = await accounts_1.default.findOne({
            where: { account_number: newAccntNumber },
        });
        if (account) {
            return res.status(400).json({
                message: `Account already exists`
            });
        }
        if (!account) {
            const newUser = await accounts_1.default.create({
                id: idNew,
                account_name: `${first_name} ${last_name}`,
                account_number: newAccntNumber,
                bank_name,
                bvn,
                phone_number,
                email,
                currency_code,
                account_opening_date: new Date(),
                account_type,
                status,
                account_balance
            });
            return res.status(200).json({
                Message: "New Account created",
                newUser
            });
        }
        else {
            return res.status(301).json({ msg: "Account already exists" });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};
exports.createAccount = createAccount;
const getSingleAccount = async (req, res, next) => {
    try {
        const accountNumber = req.query.account_number;
        const findAccount = await accounts_1.default.findOne({ where: { account_number: accountNumber } });
        if (findAccount) {
            return res.status(200).json({
                message: `Account fetched successfully`,
                findAccount
            });
        }
        return res.status(404).json({
            message: `Account Not Found`
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};
exports.getSingleAccount = getSingleAccount;
const getAllAccounts = async (req, res, next) => {
    try {
        const accounts = await accounts_1.default.findAll({});
        if (accounts.length === 0) {
            return res.status(404).json({
                message: `No existing accounts`
            });
        }
        return res.status(200).json({
            message: `Accounts fetched successfully`,
            accounts
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};
exports.getAllAccounts = getAllAccounts;
const deactivateAccount = async (req, res, next) => {
    try {
        const accountNumber = req.params.account_number;
        const confirm = await accounts_1.default.findOne({ where: { account_number: accountNumber } });
        if (!confirm) {
            return res.status(404).json({
                message: `Account not found`
            });
        }
        const deactivateAccount = await accounts_1.default.update({
            status: "deactivated"
        }, { where: { account_number: accountNumber } });
        const check = await accounts_1.default.findOne({ where: { account_number: accountNumber } });
        if (deactivateAccount) {
            return res.status(200).json({
                message: `Account deactivated successfully`,
                check
            });
        }
        return res.status(404).json({
            message: `Account Not deactivated`
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};
exports.deactivateAccount = deactivateAccount;
const updateAccountDetails = async (req, res, next) => {
    try {
        const accountNumber = req.params.account_number;
        const findAccount = await accounts_1.default.findOne({ where: { account_number: accountNumber } });
        if (!findAccount) {
            return res.status(404).json({
                message: `Account does not exist`
            });
        }
        const newData = await findAccount.update({
            phone_number: req.body.phone_number,
            email: req.body.email
        });
        if (newData) {
            return res.status(200).json({
                message: `Data successfully updated`,
                findAccount
            });
        }
        return res.status(401).json({
            message: `Unable to update`
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};
exports.updateAccountDetails = updateAccountDetails;
const reactivateAccount = async (req, res, next) => {
    try {
        const accountNumber = req.params.account_number;
        const confirm = await accounts_1.default.findOne({ where: { account_number: accountNumber } });
        if (!confirm) {
            return res.status(404).json({
                message: `Account not found`
            });
        }
        const reactivateAccount = await accounts_1.default.update({
            status: "active"
        }, { where: { account_number: accountNumber } });
        const check = await accounts_1.default.findOne({ where: { account_number: accountNumber } });
        if (reactivateAccount) {
            return res.status(200).json({
                message: `Account reactivated successfully`,
                check
            });
        }
        return res.status(404).json({
            message: `Account Not Reactivated`
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};
exports.reactivateAccount = reactivateAccount;
const getAccountBalance = async (req, res, next) => {
    try {
        const account_number = req.query.account_number;
        const account = await accounts_1.default.findOne({ where: { account_number: account_number } });
        if (!account) {
            return res.status(404).json({
                message: `Account not found`
            });
        }
        return res.status(200).json({
            message: `Account balance retrieved successfully`,
            Data: {
                account_number: account.account_number,
                account_name: account.account_name,
                currency_code: account.currency_code,
                account_type: account.account_type,
                account_balance: account.account_balance,
                status: account.status
            }
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};
exports.getAccountBalance = getAccountBalance;
const deleteAccount = async (req, res, next) => {
    try {
        const accountsNumber = req.params.account_number;
        const confirm = await accounts_1.default.findOne({ where: { account_number: accountsNumber } });
        if (!confirm) {
            return res.status(404).json({
                message: `Account not found`
            });
        }
        const deleteAccount = await accounts_1.default.destroy({ where: { account_number: accountsNumber } });
        const check = await accounts_1.default.findAll({});
        if (deleteAccount) {
            return res.status(200).json({
                message: `Account deleted successfully`,
                check
            });
        }
        return res.status(404).json({
            message: `Account Not Deleted`
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};
exports.deleteAccount = deleteAccount;
