import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json())
app.use(cors())
app.use(logger("dev"))
app.use(cookieParser())

app.listen(process.env.PORT || 4000, ()=>{
    console.log(`Paying attention on ${process.env.PORT || 4000}`)
})


export default app;