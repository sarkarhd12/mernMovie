import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongodbUrl=process.env.MONGOURL

async function connectDB () {
   try{
        await mongoose.connect(mongodbUrl);
         console.log("Connected to database");
   }catch(error){
   console.log("error connecting to database"+error)
   }
}

export default connectDB;