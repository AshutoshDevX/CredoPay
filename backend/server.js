import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import User from './routes/user.js'
import Transactions from './routes/transaction.js'
const app = express();


const PORT = process.env.PORT;


app.use(cors());
app.use(express.json());

app.use("/user", User);
app.use("/transactions", Transactions)

app.listen(PORT, () => {
    console.log(`server running at ${3000}`)
});