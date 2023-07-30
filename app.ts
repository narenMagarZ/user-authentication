import express, { NextFunction, Request, Response } from 'express'
import router from './routes'
import AppError from './utils/apperror'
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api',router)

app.use('*',(req,res,next)=>{
     const err = new AppError(404,'route not found')
     next(err)
})

app.use((err:AppError,_req:Request,res:Response,_next:NextFunction)=>{
     const statusCode = err.statusCode || 500
     return res.status(statusCode)
     .json({
          status:'fail',
          message:err.message
     })
})
export default app