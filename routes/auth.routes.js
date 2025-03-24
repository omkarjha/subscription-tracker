import { Router } from "express";

import { signUp, signIn, signOut } from '../controllers/auth.controller.js';

const authRouter = Router();

// This is the base URL for the auth routes
authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);

export default authRouter;