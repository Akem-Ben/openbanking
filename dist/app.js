"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import {db}  from "./configurations/database";
const accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const database_1 = __importDefault(require("./configurations/database"));
// const connection = mysql.createConnection(`${process.env.DATABASE_URL}`)
// console.log('Connected to PlanetScale!')
// connection.end()
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use('/account', accountRoutes_1.default);
app.use('/transaction', transactionRoutes_1.default);
// async function startApp() {
//   try {
//     await db.sync({});
//     console.log('Database synchronized');
//   } catch (error) {
//     console.error('Error synchronizing database:', error);
//   }
// }
// startApp();
const syncDatabase = async () => {
    try {
        await database_1.default.authenticate();
        console.log('Connected to the database.');
        await database_1.default.sync({ force: false }).then(() => {
            console.log('Database synced successfully');
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
syncDatabase();
app.listen(process.env.PORT || 4000, () => {
    console.log(`Paying attention on ${process.env.PORT || 4000}`);
});
exports.default = app;
