import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../Models/user.js';
import { ok, unAuthorized, notFound, badRequest, serverError } from '../default/constantvalue.js'; 

export const userSignIn = async (req, res) => {
    const { email, password, role } = req.body;
    try{
        const existingUser = await User.findOne({ email});
        if(existingUser.role === 'admin'){

            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if(!isPasswordCorrect)return res.status(badRequest).json({ message: 'Invalid credential'});
                
            const token = jwt.sign({email:existingUser.email, id: existingUser._id} ,process.env.SECRET, {expiresIn:'1hr'});
            res.status(ok).json({ token});
        } else {
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if(!isPasswordCorrect)return res.status(badRequest).json({ message: 'Invalid credential'});
            res.status(ok).json({ message:'login by user'});
        }
    } catch(error){
        res.status(serverError).json({message:'something went wrong'});

    }
    
};

export const userSignUp = async  (req, res) => {
    const{email, password, confirmPassword, role} = req.body;
    try{
        
        const existingUser = await User.findOne({ email});
        if(existingUser) return res.status(badRequest).json({ message: 'user does not exist'}) ;
        
        if(password !== confirmPassword) return res.status(unAuthorized).json({ message: 'passwords do not match'}) ;
        const hashedPassword = await bcrypt.hash(password,12);
        const result =await User.create({email,role, password: hashedPassword});
        res.status(ok).json({ result});
        
    }catch(error) {
        res.status(serverError).json({message:'something went wrong'});

    }

};