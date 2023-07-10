import { Model, DataTypes } from "sequelize";
import sequelize from "../configurations/database";
// import sequelize from 'sequelize'
import Transaction from './transactions'

export interface AccountAtrributes {
  id: string;
  account_name: string;
  account_number: number;
  bank_name: string;
  bvn: number;
  phone_number: string;
  email: string;
  currency_code: string;
  account_opening_date: Date;
  account_type: string;
  status: string;
  account_balance: number;
}


class Account extends Model<AccountAtrributes> {
    id!: string;
    account_name!: string;
    account_number!: number;
    bank_name!: string
    bvn!: number;
    phone_number!: string;
    email!: string;
    currency_code!: string;
    account_opening_date!: Date;
    last_transaction_time!: Date;
    account_type!: string;
    status!: string;
    account_balance!: number;
}

Account.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: false,
    },
    account_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      bank_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bvn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      currency_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_opening_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      account_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
  },
    {
    sequelize,
    modelName: "Account",
    timestamps: true
  }

);

// Account.hasMany(Transaction, {foreignKey: 'sender_account_number', as: 'transaction'})

// Transaction.belongsTo(Account, {foreignKey: 'sender_account_number', as: 'sender'})


export default Account;
