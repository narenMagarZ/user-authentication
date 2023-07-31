import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/apperror'

export function authenticate(req:Request, res:Response, next:NextFunction){
     const secretKey = process.env.JWT_SECRET || ''
     const token = req.header('AUTHORIZATION')?.replace('Bearer ','')
     if(!token){
          return next(new AppError(401,'unauthorized'))
     }
     try{
          const decodedToken = jwt.verify(token,secretKey)
          req.user = decodedToken
          next()
     }
     catch(err){
          return next(err)
     }
}