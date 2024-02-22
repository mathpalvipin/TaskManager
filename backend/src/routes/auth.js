import { Router } from "express";
const router = Router();
import { genSalt, hash, compare } from "bcrypt";

import User from "../models/User.js";
// import { secretKey } from "../config/config.js";
import { tokenGenerator, verifyToken } from "../helper/authToken.js";
import cookieParser from "cookie-parser";

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    //     Hashing:

    // Hashing is a one-way process that transforms plain text (like a password) into a fixed-length string of characters.
    // A good hash function ensures that it's computationally infeasible to reverse the process and obtain the original password.
    // Common hash functions include bcrypt, SHA-256, and SHA-3.
    // Salting:

    // Salting involves adding a unique, random value (salt) to each password before hashing it.
    // The salt is then stored along with the hashed password in the database.
    // This prevents attackers from using precomputed tables (rainbow tables) to crack passwords since each password has a unique salt.

    //check if username exists
    // const Userexists= await User.exists({username:username});
    // if(Userexists){
    //     return res.status(400).send('Email already exists.');
    // }

    const user = new User({
      email,
      username,
      password: hashedPassword,
    });
    await user.save();
    var token = tokenGenerator(user);
    res.cookie("userToken", token, { httpOnly: true }); //set token in HTTPonly cookie ,
    // this cookie can not be read by javascript (so secure)and send with every request from frontend to backend.

    res
      .status(201)
      .json({
        message: "User created successfully",
        username: user.username,
        email: user.email,
      });
  } catch (error) {
    // console.error(error.code);
    if (error.code == 11000)
      return res.status(400).send({ Error: "Email already exists." });
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    var token = tokenGenerator(user);
    res.cookie("userToken", token, { httpOnly: true }); //set token in HTTPonly cookie ,
    // this cookie can not be read by javascript (so secure)and send with every request from frontend to backend.
    setTimeout(() => {
      res
        .status(200)
        .json({
          messages: "Login sucessfully",
          username: user.username,
          email: user.email,
        });
    }, 2000);
  } catch (error) {
    console.error(error);
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
    res.cookie("userToken", "", { expires: new Date(0) });

  setTimeout( ()=>{res.status(200).send({ message: "User Logged out successfully" })},2000);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
