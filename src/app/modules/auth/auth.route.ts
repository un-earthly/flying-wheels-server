import { Router } from 'express';
import { login, logout, refreshToken, resetPassword, register } from './auth.controller';
import { addLoginInfo, addRegisterInfo } from './auth.middlewares';

const router = Router();

router.post('/login', addLoginInfo, login);
router.post('/register', addRegisterInfo, register);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/reset-password', resetPassword);


export const AuthRoutes = router;
