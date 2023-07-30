import express from 'express'
import userController from '../controllers'
const router = express.Router()

router.get('/',(req,res)=>{
     return res.status(200).json({
          message:'you got me'
     })
})
router.post('/register',userController.register)
router.post('/login',userController.login)
router.route('/user/:id').delete(userController.deleteUser).put(userController.updateUser)
router.put('/changepassword/:id',userController.changePassword)
export default router