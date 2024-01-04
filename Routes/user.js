import express from 'express';
const router = express.Router();

import { userSignIn, userSignUp } from '../Controllers/user.js';

router.post('/logIn', userSignIn);
router.post('/signup',userSignUp);

export default router;