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
  if(findAccount.status !== 'active')
  return res.status(404).json({
    message: `Account has been deactivated`
})

  let currentAccountBalance = findAccount.account_balance;
  let newAccountBalance = 0;
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
      findAccount.last_transaction_time = new Date()

        if(transaction_type === "debit"){
        newAccountBalance = currentAccountBalance - amount
        }else if(transaction_type === "credit"){
          newAccountBalance = currentAccountBalance + amount
        }

        await findAccount.update({
          account_balance: newAccountBalance
        });

        return res.status(200).json({
            message: `Transaction successful`,
            account_name: findAccount.account_name,
            previous_account_balanace: currentAccountBalance,
            new_account_balanace: findAccount.account_balance,
            findAccount,
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

export const getTransactionById = async(req:Request, res:Response, next:NextFunction) => {
  try{
  const idCheck = req.params.id;
  const transaction = await Transaction.findOne({where: {id:idCheck}})
  if(!transaction) return res.status(404).json({message: `Transaction not found`})
  return res.status(200).json({message: `Transaction found`, data: transaction})
  }catch (error:any) {
    console.log(error.message)
  res.status(500).json({ Error: "Internal Server Error" });
}
}

export const getAllTransactions = async(req:Request, res:Response, next:NextFunction) => {
  try{
  let transactionz = await Transaction.findAll({})
  if(!transactionz) return res.status(404).json({message: `Unable to fetch data`})
  return res.status(200).json({message: `Transactions fetched`, data: transactionz})
  }catch (error:any) {
    console.log(error.message)
  res.status(500).json({ Error: "Internal Server Error" });
}
}

export const getTransactionsOfAUser = async(req:Request, res:Response, next:NextFunction) => {
  try{
    const accnt = req.params.id;
    const userAccount = await Account.findOne({where: {account_number:accnt}})
    if(!userAccount){
      return res.status(404).json({
        message: `Account does not exist`
      })
    }
    const transactions = await Transaction.findAll({where: {sender_account_number:userAccount.account_number}})
    if(!transactions){
      return res.status(404).json({
        message: `Transactions do not exist`
      })
    }
    return res.status(200).json({
      message: `Transactions successfully fetched`,
      Account: userAccount,
      data: transactions
    })
  }catch (error:any) {
    console.log(error.message)
  res.status(500).json({ Error: "Internal Server Error" });
}
}

export const deleteTransaction = async(req:Request, res:Response, next:NextFunction) => {
  try{
    const transId = req.params.id;
    const del = await Transaction.destroy({where: {id:transId}})
    if(!del) return res.status(404).json({message: `Unable to delete`})
    const allTrans = await Transaction.findAll({})
    return res.status(200).json({
      message: `Transaction deleted successfully`,
      Transactions: allTrans
    })
  }catch (error:any){
    console.log(error.message)
  res.status(500).json({ Error: "Internal Server Error" });
}
}