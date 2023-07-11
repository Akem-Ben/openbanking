"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_PASSWORD = exports.DB_NAME = exports.DB_SCHEMA_NAME = exports.jwtSecret = exports.DATABASE_USERNAME = exports.DATABASE_PORT = exports.DATABASE_NAME = exports.DATABASE_HOST = exports.DATABASE_PASSWORD = exports.DATABASE_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
exports.DATABASE_HOST = process.env.DATABASE_HOST;
exports.DATABASE_NAME = process.env.DATABASE_NAME;
exports.DATABASE_PORT = process.env.DATABASE_PORT;
exports.DATABASE_USERNAME = process.env.DATABASE_USERNAME;
exports.jwtSecret = process.env.JWT_SECRET;
exports.DB_SCHEMA_NAME = process.env.DB_SCHEMA_NAME;
exports.DB_NAME = process.env.DB_NAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
