import { Express } from "express"
export interface createUserProps {
     username:string
     email:string
     password:string
}

export interface userInfoProps {
     id:string
     username:string
}

declare global{
     namespace Express {
          export interface Request {
               user?:any
          }
     }
}

