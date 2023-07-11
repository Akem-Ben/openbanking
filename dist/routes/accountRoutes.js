"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accounts_1 = require("../controllers/accounts");
const router = express_1.default.Router();
router.post('/create', accounts_1.createAccount);
router.get('/getsingle/', accounts_1.getSingleAccount);
router.get('/getall', accounts_1.getAllAccounts);
router.put('/deactivate/:account_number', accounts_1.deactivateAccount);
router.put('/update/:account_number', accounts_1.updateAccountDetails);
router.put('/reactivate/:account_number', accounts_1.reactivateAccount);
router.delete('/delete/:account_number', accounts_1.deleteAccount);
router.get('/accountbalance/', accounts_1.getAccountBalance);
exports.default = router;
