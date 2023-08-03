const router = require('express').Router()
import verifyJWT from '../middleweres/verifyJWT'
import { getReviewsController, addReviewsColltroller } from "../controller/review.controller"

router.get('/', getReviewsController)
router.post('/', verifyJWT, addReviewsColltroller)


export default router