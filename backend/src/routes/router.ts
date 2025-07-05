import express from 'express'
import counsellorRouter from './counsellorRouter'
import adminRouter from './adminRouter'
import userRouter from './userRouter'
const router = express.Router()



router.use('/user',userRouter)
router.use('/admin',adminRouter)
router.use('/counsellor',counsellorRouter)



export default router
