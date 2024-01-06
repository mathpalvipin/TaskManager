// require('dotenv').config();
import env from 'dotenv';
env.config();
export const secretKey = process.env.SECRET_KEY || 'mysecretkey';
export const  mongoURI = process.env.MONGODB_URI || 'url';