import { Router, type Router as RouterType } from 'express';
import { login, refresh, logout } from '../controllers/auth.controller';

export const authRouter: RouterType = Router();

authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', logout);
