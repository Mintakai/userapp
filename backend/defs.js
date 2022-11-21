import dotenv from 'dotenv';

dotenv.config();

export const tokenSecret = process.env.TOKEN_SECRET;
export const connectionString = process.env.CONNECTION_STRING;
export const servePort = process.env.PORT;