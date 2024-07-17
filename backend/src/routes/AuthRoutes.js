import { Router } from "express";
const router = Router();
import { genSalt, hash, compare } from "bcrypt";

import User from "../models/User.js";
// import { secretKey } from "../config/config.js";
import { tokenGenerator, verifyToken } from "../helper/authToken.js";
import cookieParser from "cookie-parser";

router.post("/signup", async (req, res) => {
  try {
    const { email, username } = req.body;
    const salt = await genSalt(10);
    const hashedPassword = await hash(req.body.password, salt);
    //     Hashing:

    // Hashing is a one-way process that transforms plain text (like a password) into a fixed-length string of characters.
    // A good hash function ensures that it's computationally infeasible to reverse the process and obtain the original password.
    // Common hash functions include bcrypt, SHA-256, and SHA-3.
    // Salting:

    // Salting involves adding a unique, random value (salt) to each password before hashing it.
    // The salt is then stored along with the hashed password in the database.
    // This prevents attackers from using precomputed tables (rainbow tables) to crack passwords since each password has a unique salt.

    // check if username exists
    // const Userexists= await User.exists({username:username});
    // if(Userexists){
    //     return res.status(400).send('Usser already exists.');
    // }
   // check if email exists 
   const userEmail = await User.exists({email:email});
   if(userEmail){
    return res.status(400).send({ message: "Email already exists" });
   }

    const user = new User({
      email,
      username,
      password: hashedPassword,
    });
    await user.save();
 
    var token = tokenGenerator(user);
    res.cookie("userToken", token,  { httpOnly: true , Secure:true, SameSite:'None' } ); //set token in HTTPonly cookie ,
    // this cookie can not be read by javascript (so secure)and send with every request from frontend to backend.

    res.status(201).json({
      message: "User created successfully",
      username: user.username,
      email: user.email,
      id:user._id
    });
  } catch (error) {
    
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email don't exists" });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong password" });
    }

    var token = tokenGenerator(user);
    res.cookie("userToken", token, { httpOnly: true , Secure:true, SameSite:'None' }  ); //set token in HTTPonly cookie ,
    // this cookie can not be read by javascript (so secure)and send with every request from frontend to backend.
    setTimeout(() => {
      res.status(200).json({
        messages: "Login sucessfully",
        username: user.username,
        email: user.email,
        id:user._id
      });
    }, 2000);
  } catch (error) {
   console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Middleware to verify JWT token

router.get("/protected", verifyToken, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", user: req.user });
});

router.delete("/logout", (req, res) => {
  try {
    res.cookie("userToken", "", { expires: new Date(0) } , { httpOnly: true , Secure:true, SameSite:'None' } );

    setTimeout(() => {
      res.status(200).send({ message: "User Logged out successfully" });
    }, 2000);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/users',verifyToken, async(req,res)=>{
  try{ 
  const users  = await User.find();
  const sendUser = users.map(({_id, email ,username})=>({_id ,email , username}))
  res.status(200).send(sendUser);
  }catch (error) {
    console.log(error)
    res.status(500).json({ message: "unable to fetch user" });
}}
)
export default router;
