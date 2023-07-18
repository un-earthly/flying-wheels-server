const router = require('express').Router()
import verifyJWT from '../middleweres/verifyJWT'
import { getReviewsController, addReviewsColltroller } from "../controller/review.controller"

router.get('/list', getReviewsController)


router.post('/add', verifyJWT, addReviewsColltroller)


export default router