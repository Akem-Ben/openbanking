import { Sequelize } from "sequelize";
import { DB_SCHEMA_NAME, DB_NAME, DB_PASSWORD } from '../configurations/configure'
import dotenv from 'dotenv';
import mysql2 from "mysql2";

import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_URL,
  DATABASE_USERNAME,

} from "./configure";

dotenv.config()

const dbName = DATABASE_NAME;
const dbPort = DATABASE_PORT;
const dbUsername = DATABASE_USERNAME;
const dbPassword = DATABASE_PASSWORD;
const dbHost = DATABASE_HOST;

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  dialect: "mysql",
  host: dbHost,
  port: dbPort,
  dialectModule: mysql2,
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

export default sequelize;

