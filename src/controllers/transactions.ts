import express, {Request, Response, NextFunction} from 'express';
import {v4} from 'uuid';
import Account from '../models/accounts';
import Transaction from '../models/transactions';

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idNew = v4();
  const {
    amount,
    channel,
transaction_type,
narration,
sender_account_number,
currency_code,
receiver_account_number,
  } = req.body;

  const findAccount = await Account.findOne({where: {account_number:sender_account_number}})
  if(!findAccount){
    return res.status(404).json({
        message: `Account does not exist`
    })
  }
  let currentAccountBalance = findAccount.account_balance
    const newTransaction = await Transaction.create({
        id: idNew,
        amount,
        channel,
        transaction_type,
        narration,
        sender_account_number,
        currency_code,
        receiver_account_number,
        transaction_date: new Date(),
        transaction_status: "successful"
    })
    if(newTransaction){
        if(transaction_type === "debit"){
        findAccount.account_balance = findAccount.account_balance - amount
        }else if(transaction_type === "credit"){
        findAccount.account_balance = findAccount.account_balance + amount
        }
        return res.status(200).json({
            message: `Transaction successful`,
            account_name: findAccount.account_name,
            previous_account_balanace: currentAccountBalance,
            new_account_balanace: findAccount.account_balance,
            newTransaction
        })
    }else{
        return res.status(401).json({transaction_status: 'unsuccessful'})
    }
    } catch (error:any) {
        console.log(error.message)
      res.status(500).json({ Error: "Internal Server Error" });
    }
  };