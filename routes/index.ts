import express from 'express'
import userController from '../controllers'
import { authenticate } from '../middlewares/auth'
const router = express.Router()

router.get('/',(req,res)=>{
     return res.status(200).json({
          message:'you got me'
     })
})
router.post('/register',userController.register)
router.post('/login',userController.login)
router.route('/user/:id').delete(authenticate,userController.deleteUser).put(authenticate,userController.updateUser)
router.put('/changepassword/:id',authenticate,userController.changePassword)
export default router