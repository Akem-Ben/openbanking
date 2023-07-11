"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../configurations/database"));
class Account extends sequelize_1.Model {
}
Account.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: false,
    },
    account_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    account_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    bank_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    bvn: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    currency_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    account_opening_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    account_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    account_balance: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: database_1.default,
    modelName: "Account",
    timestamps: true
});
// Account.hasMany(Transaction, {foreignKey: 'sender_account_number', as: 'transaction'})
// Transaction.belongsTo(Account, {foreignKey: 'sender_account_number', as: 'sender'})
exports.default = Account;
