import {
    loginController,
    makeAdminController
} from "../controller/auth.controller";

const router = require('express').Router();


router.post('/login', loginController)

router.patch('/makeadmin', makeAdminController)


export default router