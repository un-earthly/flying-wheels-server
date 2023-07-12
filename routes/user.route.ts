import {
    getUserByEmailController,
    getUsersController,
    updateUserController,
    getReviewController,
    makeAdminController,
    updateProfileController
} from "../controller/user.controller";

const router = require('express').Router();
import verifyJWT from '../middleweres/verifyJWT';

router.get('/list', getUsersController)
router.get('/user', verifyJWT, getUserByEmailController)
router.get('/review', verifyJWT, getReviewController)
router.put('/user', updateUserController)
router.put('/update-profile', verifyJWT, updateProfileController)
router.patch('/make-admin', makeAdminController)



export default router
