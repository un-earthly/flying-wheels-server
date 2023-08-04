/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { login, logout, refreshToken, resetPassword } from './auth.controller';

const router = Router();
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/reset-password', resetPassword);
export const AuthRoutes = router;
