import User from "../model/user.js";
import { generateToken } from "../utils/auth.js";
import bcrypt from 'bcrypt'

export const signUp = async (req,res) =>{
    const {fullname,email,password} = req.body;
   
   try{
   const existingUser = await User.findOne({email});
   if(existingUser){
    return res.status(400).json({ message: 'User already exists' });
   }

   const newUser = new User({fullname,email,password})
   const salt = await bcrypt.genSalt(10);
   newUser.password = await bcrypt.hash(password,salt);
   await newUser.save();

   const token = generateToken(newUser._id);
   res.status(201).json({user:newUser,token});

   }catch(error){
    res.status(500).json({message:'Something went wrong try again'})
    console.log(error)

   }

}