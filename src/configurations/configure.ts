import dotenv from 'dotenv';

dotenv.config();


export const DB_SCHEMA_NAME = process.env.DB_SCHEMA_NAME as string
export const DB_NAME = process.env.DB_NAME as string
export const DB_PASSWORD = process.env.DB_PASSWORD as string