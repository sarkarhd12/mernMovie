import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/user.js';


dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET;

export const generateToken = (userId) => {
    return jwt.sign({ userId },
     JWT_SECRET, { expiresIn: '7d' });
  };

  export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      });
    });
  };

  // export const authMiddleware = async (req,res,next) => {
  //   const authHeader=req.headers['authorization'];
  //   const token = authHeader && authHeader.split(' ')[1];

  //   if(!token){
  //       return res.status(401).json({message:"Unauthorized user"})
  //   }

  //   try{
  //       const decoded=await verifyToken(token);
  //       req.user=decoded;
  //       next();
  //   }catch(error){
  //       console.log(error)
  //       return res.status(401).json({message:"Invalid token"})
  //   }
  // }

  export const authMiddleware = async (req, res, next) => {
    try {
      const authHeader =req.headers['authorization'];
  
      const token = authHeader && authHeader.split(' ')[1];
      
    if(!token){
        return res.status(401).json({message:"Unauthorized user"})
    }

      const decoded = await verifyToken(token);
  // console.log(decoded.userId);
      const user = await User.findById(decoded.userId);
      // console.log(user);
      if (!user) {
        return res.status(401).json({ error: 'Invalid token' });
      }
  
      req.user = user; // Attach the user object to req.user
      next();
    } catch (error) {
      console.error('Error in authMiddleware:', error.message);
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
