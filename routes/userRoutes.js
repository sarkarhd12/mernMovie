import express from 'express';
import { signUp } from '../controller/signup.js';
import {login} from '../controller/login.js';
import { authMiddleware } from '../utils/auth.js';

const router = express.Router();

router.post('/signup',signUp);
router.post('/login', login);

router.get('/profile',authMiddleware, (req,res)=>{
    res.json({user : req.user})
})



export default router;