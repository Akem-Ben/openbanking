import dotenv from 'dotenv';

dotenv.config();




export const DATABASE_URL = process.env.DATABASE_URL as string;

export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;

export const DATABASE_HOST = process.env.DATABASE_HOST as string;

export const DATABASE_NAME = process.env.DATABASE_NAME as string;

export const DATABASE_PORT = process.env.DATABASE_PORT as unknown as number;

export const DATABASE_USERNAME = process.env.DATABASE_USERNAME as string;

export const jwtSecret = process.env.JWT_SECRET;
export const DB_SCHEMA_NAME = process.env.DB_SCHEMA_NAME as string
export const DB_NAME = process.env.DB_NAME as string
export const DB_PASSWORD = process.env.DB_PASSWORD as string