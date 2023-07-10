import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
// import {db}  from "./configurations/database";
import accountRoutes from './routes/accountRoutes';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactionRoutes';
import mysql from 'mysql2';
import sequelize from './configurations/database';

// const connection = mysql.createConnection(`${process.env.DATABASE_URL}`)
// console.log('Connected to PlanetScale!')
// connection.end()

dotenv.config()

const app = express();

app.use(express.json())
app.use(cors())
app.use(logger("dev"))
app.use(cookieParser())
app.use('/account', accountRoutes)
app.use('/transaction', transactionRoutes)

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
   await sequelize.authenticate();
   console.log('Connected to the database.');
   await sequelize.sync({ force: false }).then(() => {
       console.log('Database synced successfully');
     });

  } catch (error) {
   console.error('Unable to connect to the database:', error);
  } 
}
syncDatabase()

app.listen(process.env.PORT || 4000, ()=>{
    console.log(`Paying attention on ${process.env.PORT || 4000}`)
})


export default app;