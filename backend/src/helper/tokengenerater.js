import { secretKey } from '../config/config.js';
import JWT from "jsonwebtoken";
export const tokenGenerator=(user)=>{
const token = JWT.sign({ email: user.email }, secretKey, {
    expiresIn: '1h',
  });
  return token;
}


