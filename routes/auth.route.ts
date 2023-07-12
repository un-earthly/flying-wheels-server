import {
    loginController,
    updateUserController,
    makeAdminController
} from "../controller/auth.controller";

const router = require('express').Router();


router.post('/login', loginController)

router.put('/update-user', updateUserController)

router.patch('/makeadmin', makeAdminController)


export default router