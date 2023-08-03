import {
    getUserByEmailController,
    getUsersController,
    getReviewController,
    updateProfileController,
    createUserController
} from "../controller/user.controller";

const router = require('express').Router();
import verifyJWT from '../middleweres/verifyJWT';

router.get('/', getUsersController)
router.get('/', verifyJWT, getUserByEmailController)
router.get('/review', verifyJWT, getReviewController)
router.post('/', createUserController)
router.put('/', verifyJWT, updateProfileController)



export default router
