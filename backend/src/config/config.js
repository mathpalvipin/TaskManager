require('dotenv').config();
console.log(process.env.MONGODB_URI)
module.exports = {
    secretKey: process.env.SECRET_KEY || 'mysecretkey',
    mongoURI: process.env.MONGODB_URI || 'url',
  };