"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../configurations/database"));
class Transaction extends sequelize_1.Model {
}
Transaction.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    channel: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    transaction_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    narration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    sender_account_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    currency_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    receiver_account_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    transaction_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    transaction_status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "Transaction",
    timestamps: true
});
exports.default = Transaction;
