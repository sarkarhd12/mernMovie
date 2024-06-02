import express from 'express';
import dotenv from 'dotenv'
import connectDB from './model/mongoConnection.js';
import router from './routes/userRoutes.js';
import movieRouter from './routes/movieRoutes.js';
// import bodyParser from 'body-parser';
import cors from 'cors'

dotenv.config();
const port=process.env.PORT || 3001

const app=express();


connectDB()
app.use(cors())
app.use(express.json())
// app.use(bodyParser.json())

app.use('/user',router);
app.use('/movies',movieRouter);

app.listen(port,()=>{
    console.log("server is running on port "+port);
})