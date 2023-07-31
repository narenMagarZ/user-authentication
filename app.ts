import express, { NextFunction, Request, Response } from 'express'
import router from './routes'
import AppError from './utils/apperror'
import helmet from 'helmet'
import hpp from 'hpp'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
const app = express()


// allow cross-origin requests
app.use(cors())

// set security http headers
app.use(helmet())
app.use(express.json({
     limit:'10kb'
}))
app.use(express.urlencoded({extended:false}))
// limit requests from the same IP
app.use('/api',rateLimit({
     windowMs:60*60*1000, // 15 min
     max:200,
     standardHeaders:true,
     legacyHeaders:false,
     message:'too many requests from this IP, please try again after an hour'
}))

// prevent parametere pollution
app.use(hpp())
// data sanitizatioin against nosql query injectioin
app.use(mongoSanitize())

// routes
app.use('/api',router)

// handle undefined routes
app.use('*',(req,res,next)=>{
     const err = new AppError(404,'route not found')
     next(err)
})

// handle global error
app.use((err:AppError,_req:Request,res:Response,_next:NextFunction)=>{
     const statusCode = err.statusCode || 500
     return res.status(statusCode)
     .json({
          status:'fail',
          message:err.message
     })
})
export default app