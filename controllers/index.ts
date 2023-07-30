import { NextFunction, Request, Response } from "express";
import userServices from "../services";
import AppError from "../utils/apperror";
import hash from "../utils/hash";
import compare from "../utils/compare";
import joi from 'joi'
class UserController {
     async login(req:Request,res:Response,next:NextFunction){
          const {error,value} =joi.object({
               email:joi.string().email().required().messages({
                    'string.empty':'email is required',
                    'string.email':'invalid email'
               }),
               password:joi.string().required().min(8).messages({
                    'string.empty':'password is required',
                    'string.min':'password must have at least 8 chars'
               })
          }).validate(req.body)
          if(error)
               return next(new AppError(404,error.message))
          const {email,password}=value
          if(!email || !password)
               return next(new AppError(400,'missing fields'))
          try{

               const user = await userServices.getUserByEmail(email)
               if(!user)
                    return next(new AppError(400,'user not found'))
               if(!(await compare(password,user.password)))
                    return next(new AppError(400,'password does not match'))
               return res.status(200).json({
                    status:'success',
                    message:"successfully logged in"
               })
          }
          catch(err){
               return next(err)
          }
     }
     async register(req:Request,res:Response,next:NextFunction){
          const {error,value}=joi.object({
               username:joi.string().required().min(3).messages({
                    'string.empty':'username is required',
                    'string.min':'username must have at least 3 chars long'
               }),
               email:joi.string().email().required().messages({
                    'string.empty':'email is required',
                    'string.email':'invalid email'
               }),
               password:joi.string().required().min(8).messages({
                    'string.empty':'new password is required',
                    'string.min':'new password must have a minimum length of 8'
               }),
               confirmPassword:joi.ref('password')
          }).validate(req.body)
          if(error)
          return next(new AppError(404,error.message))
          const {username,email,password}=value
          try{
               const existingUser = await userServices.getUserByEmailOrUsername(username,email)
               if(existingUser){
                    return next(new AppError(404,'username or email already exists'))
               }
               const hashed = await hash(password)
               await userServices.createUser({
                    username,
                    email,
                    password:hashed
               })
               return res.status(201).json({
                    message:'account registered'
               })
          }
          catch(err){
               return next(err)
          }
     }
     async deleteUser(req:Request,res:Response,next:NextFunction){
          const userId = req.params.id
          if(!userId)
               return next(new AppError(400,'missing id'))
          try{
               const user = await userServices.deleteUserById(userId)
               if(!user)
                    return next(new AppError(404,'no such user found'))
               return res.status(200).json({
                    status:'success',
                    message:'user deleted'
               })
          }
          catch(err){
               return next(err)
          }
     }
     
     async updateUser(req:Request,res:Response,next:NextFunction){
          const userId = req.params.id
          if(!userId)
               return next(new AppError(400,'missing id'))
          const {username,email} = req.body
          try{
               const user = await userServices.getUserById(userId)
               if(!user)
                    return next(new AppError(404,'no such user found'))
               user.email = email
               user.username = username
               await user.save()
               return res.status(200).json({
                    status:'success',
                    message:'user updated'
               })
          }
          catch(err){
               return next(err)
          }
     }
     async changePassword(req:Request,res:Response,next:NextFunction){
          const userId = req.params.id
          const {currentPassword,newPassword} = req.body
               const values = joi.object({
                    currentPassword:joi.string().required(),
                    newPassword:joi.string().required().min(8).messages({
                         'string.empty':'new password is required',
                         'string.min':'new password must have a minimum length of 8'
                    }),
                    confirmNewPassword:joi.valid(joi.ref('newPassword'))
               }).validate(req.body)
          try{
               const user = await userServices.getUserById(userId)
               if(!user)
                    return next(new AppError(404,'no such user found'))
               if(!(await compare(currentPassword,user.password)))
                    return next(new AppError(401,'password does not match'))
               user.password = await hash(newPassword)
               await user.save()
               return res.status(200).json({
                    status:'success',
                    message:'password changed'
               })

          }
          catch(err){
               next(err)
          }
     }
     
}

const userController = new UserController()
export default userController