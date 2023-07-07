import { Sequelize } from "sequelize";
// import mysql2 from 'mysql2';
// import mysql from 'mysql';


const db = new Sequelize(`${process.env.DB_SCHEMA_NAME}`, `${process.env.DB_NAME}`, `${process.env.DB_PASSWORD}`, {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
