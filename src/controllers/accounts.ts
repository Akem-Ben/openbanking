import express, {Request, Response, NextFunction} from 'express';
import {v4} from 'uuid';
import Account from '../models/accounts';


export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idNew = v4();
      const { first_name,
        last_name,
        bank_name,
        phone_number,
        email,
        bvn,
        currency_code,
        account_type,
        status,
        account_balance } = req.body;
      const setAccountNumber = await Account.findAll({});
      let newAccntNumber = 0;
      let accntArray = [];
      let maxAccnt = 0
      if(setAccountNumber.length === 0){
        newAccntNumber = 1111111110
      } else{
        for(let i = 0; i<setAccountNumber.length; i++){
            accntArray.push(setAccountNumber[i].account_number)
        }
        maxAccnt = Math.max(...accntArray)
        newAccntNumber = maxAccnt + 1;
      }
      const account = await Account.findOne({
        where: { account_number:newAccntNumber },
    });
    if(account){
        return res.status(400).json({
            message: `Account already exists`
        })
    }
      if (!account) {
        const newUser = await Account.create({
          id: idNew,
          account_name: `${first_name} ${last_name}`,
          account_number: newAccntNumber,
          bank_name,
          bvn,
          phone_number,
          email,
          currency_code,
          account_opening_date: new Date(),
          account_type,
          status,
          account_balance
        });
       return res.status(200).json({
          Message: "New Account created",
          newUser
        });
      } else {
       return res.status(301).json({ msg: "Account already exists" });
      }
    } catch (error:any) {
        console.log(error.message)
      res.status(500).json({ Error: "Internal Server Error" });
    }
  };

export const getSingleAccount = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const accountNumber:any = req.query.account_number
        const findAccount = await Account.findOne({where: {account_number:accountNumber}})
        if(findAccount){
            return res.status(200).json({
                message: `Account fetched successfully`,
                findAccount
            })
        }
        return res.status(404).json({
            message: `Account Not Found`
        })
    }catch (error:any) {
        console.log(error.message)
      res.status(500).json({ Error: "Internal Server Error" });
    }
}

export const getAllAccounts = async(req:Request, res:Response, next:NextFunction)=>{
    try{
    const accounts = await Account.findAll({})
    if(accounts.length === 0){
        return res.status(404).json({
            message: `No existing accounts`
        })
    }
    return res.status(200).json({
        message: `Accounts fetched successfully`,
        accounts
    })
}catch (error:any) {
    console.log(error.message)
  res.status(500).json({ Error: "Internal Server Error" });
}
}

export const deactivateAccount = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const accountNumber = req.params.account_number
        const confirm = await Account.findOne({where: {account_number:accountNumber}})
        if(!confirm){
            return res.status(404).json({
                message: `Account not found`
            })
        }
        const deactivateAccount = await Account.update({
            status: "deactivated"
        }, {where:{account_number:accountNumber}})
        const check = await Account.findOne({where:{account_number:accountNumber}})
        if(deactivateAccount){
            return res.status(200).json({
                message: `Account deactivated successfully`,
                check
            })
        }
        return res.status(404).json({
            message: `Account Not deactivated`
        })
    }catch (error:any) {
        console.log(error.message)
      res.status(500).json({ Error: "Internal Server Error" });
    }
}

export const updateAccountDetails = async(req:Request, res:Response, next:NextFunction)=>{
    try{
    const accountNumber = req.params.account_number;
    const findAccount = await Account.findOne({where: {account_number:accountNumber}})
    if(!findAccount){
        return res.status(404).json({
            message: `Account does not exist`
        })
    }
    const newData = await findAccount.update({
        phone_number: req.body.phone_number,
        email: req.body.email
      });

    if(newData){
        return res.status(200).json({
            message: `Data successfully updated`,
            findAccount
        })
    }
    return res.status(401).json({
        message: `Unable to update`
    })
}catch (error:any) {
    console.log(error.message)
  res.status(500).json({ Error: "Internal Server Error" });
}
}

export const reactivateAccount = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const accountNumber = req.params.account_number
        const confirm = await Account.findOne({where: {account_number:accountNumber}})
        if(!confirm){
            return res.status(404).json({
                message: `Account not found`
            })
        }
        const reactivateAccount = await Account.update({
            status: "active"
        }, {where:{account_number:accountNumber}})
        const check = await Account.findOne({where:{account_number:accountNumber}})
        if(reactivateAccount){
            return res.status(200).json({
                message: `Account reactivated successfully`,
                check
            })
        }
        return res.status(404).json({
            message: `Account Not Reactivated`
        })
    }catch (error:any) {
        console.log(error.message)
      res.status(500).json({ Error: "Internal Server Error" });
    }
}

export const getAccountBalance = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const account_number:any = req.query.account_number
        const account = await Account.findOne({where: {account_number:account_number}})
        if(!account){
            return res.status(404).json({
                message: `Account not found`
            })
        }
            return res.status(200).json({
                message: `Account balance retrieved successfully`,
                Data: {
                account_number: account.account_number,
                account_name: account.account_name,
                currency_code: account.currency_code,
                account_type: account.account_type,
                account_balance: account.account_balance,
                status: account.status
                }
            })
    }catch (error:any) {
        console.log(error.message)
      res.status(500).json({ Error: "Internal Server Error" });
    }
}

export const deleteAccount = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const accountsNumber = req.params.account_number
        const confirm = await Account.findOne({where: {account_number:accountsNumber}})
        if(!confirm){
            return res.status(404).json({
                message: `Account not found`
            })
        }
        const deleteAccount = await Account.destroy({where:{account_number:accountsNumber}})
        const check = await Account.findAll({})
        if(deleteAccount){
            return res.status(200).json({
                message: `Account deleted successfully`,
                check
            })
        }
        return res.status(404).json({
            message: `Account Not Deleted`
        })
    }catch (error:any) {
        console.log(error.message)
      res.status(500).json({ Error: "Internal Server Error" });
    }
}

