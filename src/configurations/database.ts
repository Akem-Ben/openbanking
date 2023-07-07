import { Sequelize } from "sequelize";
// import mysql2 from 'mysql2';
// import mysql from 'mysql';


const db = new Sequelize('OpenBanking', 'root', '311092Akem.', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
