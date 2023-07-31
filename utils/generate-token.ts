import jwt from 'jsonwebtoken'

export function generateToken(data:any):string{
     const secretKey = process.env.JWT_SECRET || ''
     return jwt.sign(data,secretKey,{expiresIn:'1h'})
}