import User from "../model/user.js";
import { generateToken } from "../utils/auth.js";
import bcrypt from 'bcrypt';

export const login = async (req,res) =>{
    try{
      const {email,password} = req.body;
     
      const user = await User.findOne({email});

      if(!user){
        return res.status(404).json({message:"User not found"})
      }

      const isMatch =await bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.status(401).json({message:"Invalid password"})
      }

      const token = generateToken(user._id);
       res.status(200).json({user,token});

    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
console.log(error)
    }
}

