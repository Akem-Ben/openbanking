import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import db  from "./configurations/database";
import accountRoutes from './routes/accountRoutes';
import dotenv from 'dotenv';

dotenv.config()


const app = express();

app.use(express.json())
app.use(cors())
app.use(logger("dev"))
app.use(cookieParser())
app.use('/account', accountRoutes)

async function startApp() {
  try {
    await db.sync({});
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

startApp();
 

app.listen(process.env.PORT || 4000, ()=>{
    console.log(`Paying attention on ${process.env.PORT || 4000}`)
})


export default app;