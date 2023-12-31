import { Model, DataTypes } from "sequelize";
import sequelize from "../configurations/database";
import Account from './accounts'

export interface TransactionAtrributes {
  id: string;
  amount: number;
  channel: string;
  transaction_type: string;
  narration: string;
  sender_account_number: number;
  currency_code: string;
  receiver_account_number: number;
  transaction_date: Date;
  transaction_status: string;
}


class Transaction extends Model<TransactionAtrributes> {
    id!: string;
    amount!: number;
    channel!: string;
    transaction_type!: string;
    narration!: string;
    sender_account_number!: number;
    currency_code!: string;
    receiver_account_number!: number;
    transaction_date!: Date;
    transaction_status!: string;
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      channel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      transaction_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      narration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sender_account_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      currency_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      receiver_account_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transaction_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      transaction_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
    {
    sequelize,
    modelName: "Transaction",
    timestamps: true
  }

);



export default Transaction;
