import express from 'express';
const router = express.Router();

import { userSignIn, userSignUp } from '../Controllers/user.js';

router.post('/logIn', userSignIn);
router.post('/signUp',userSignUp);

export default router;