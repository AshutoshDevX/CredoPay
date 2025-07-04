import express from 'express';
import { userSignUp } from '../controller/user.js';
import { userSignIn } from '../controller/user.js';
const router = express.Router();

router.post("/signup", userSignUp);
router.post("/signup", userSignIn);

export default router;