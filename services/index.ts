import mongoose from "mongoose"
import User from "../models"
import { createUserProps } from "../types"

class UserServices {
     constructor(){

     }
     async createUser({
          username,
          email,
          password
     }:createUserProps){
          const user = await new User({
               username,
               email,
               password
          }).save()
          return user
     }
     async getUserByEmailOrUsername(username:string,email:string){
          const user = await User.findOne({$or:[{username},{email}]})
          return user
     }
     async getUserByEmail(email:string){
          const user = await User.findOne({email})
          return user
     }
     async deleteUserById(id:string){
          const user = await User.deleteOne({_id:new mongoose.Types.ObjectId(id)})
          return user
     }
     async getUserById(id:string){
          const user = await User.findById(id)
          return user
     }
     async updatePassword(password:string){

     }
}

const userServices = new UserServices()
export default userServices