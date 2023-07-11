"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const mysql2_1 = __importDefault(require("mysql2"));
const configure_1 = require("./configure");
dotenv_1.default.config();
const dbName = configure_1.DATABASE_NAME;
const dbPort = configure_1.DATABASE_PORT;
const dbUsername = configure_1.DATABASE_USERNAME;
const dbPassword = configure_1.DATABASE_PASSWORD;
const dbHost = configure_1.DATABASE_HOST;
const sequelize = new sequelize_1.Sequelize(dbName, dbUsername, dbPassword, {
    dialect: "mysql",
    host: dbHost,
    port: dbPort,
    dialectModule: mysql2_1.default,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true,
        },
    },
});
// export const db = new Sequelize(DB_SCHEMA_NAME, DB_NAME, DB_PASSWORD, {
//   host: 'localhost',
//   dialect: 'mysql',
// });
exports.default = sequelize;
