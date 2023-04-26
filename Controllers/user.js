import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../Models/user.js';
import { ok, notFound, badRequest, serverError } from '../default/constantvalue.js'; 

export const userSignIn = async (req, res) => {
    const { email, password } = req.body;
    try{
        const existingUser = await User.findOne({ email});
        if(existingUser.role === 'admin'){
            if(!existingUser) return res.status(notFound).json({ message: 'user doesnot exist'}) ;
            
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if(!isPasswordCorrect)return res.status(badRequest).json({ message: 'Invalid credential'});
            
                
            const token = jwt.sign({email:existingUser.email, id: existingUser._id} ,process.env.SECRET, {expiresIn:'1hr'});
            res.status(ok).json({ token});
    
        } else {
                if(!existingUser) return res.status(notFound).json({ message: 'user doesnot exist'}) ;
            
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if(!isPasswordCorrect)return res.status(badRequest).json({ message: 'Invalid credential'});
            
            }
    } catch(error){
        res.status(serverError).json({message:'somethng went wrong'});

    }
    
};

export const userSignUp = async  (req, res) => {
    const{email, password, confirmPassword, role} = req.body;
    try{
        const existingUser = await User.findOne({ email});
        if(existingUser) return res.status(badRequest).json({ message: 'user doesnot exist'}) ;

        if(password !== confirmPassword) return res.status(badRequest).json({ message: 'passwords do not match'}) ;
        const hashedPassword = await bcrypt.hash(password,12);
        const result =await User.create({email, password: hashedPassword});

        res.status(ok).json({ result});
        
    }catch(error) {
        res.status(serverError).json({message:'somethng went wrong'});

    }

};