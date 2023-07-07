import { Sequelize } from "sequelize";
import { DB_SCHEMA_NAME, DB_NAME, DB_PASSWORD } from '../configurations/configure'
import dotenv from 'dotenv';

dotenv.config()


const db = new Sequelize(DB_SCHEMA_NAME, DB_NAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
