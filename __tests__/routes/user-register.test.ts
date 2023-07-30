import request from 'supertest'
import app from '../../app'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

describe('User Registration',()=>{
     beforeAll(async()=>{
          await mongoose.connect(process.env.MONGODB_URL||'')
     })
     afterAll(async()=>{
          await mongoose.connection.close()
     })
     it('should register a new user',async()=>{
          const newUser = {
               email:'naren123@gmail.com',
               username:'naren__123',
               password:'12345678',
               confirmPassword:'12345678'
          }
          const response = await request(app).post('/api/register').send(newUser)
          expect(response.status).toBe(201)
          expect(response.body).toEqual({
               message:'account registered'
          })
     })

     test('should return an error for missing fields',async()=>{
          const invalidUser = {
               username:'naren__',
               password:'12345678',
               confirmPassword:'12345678'
          }
          const response = await request(app).post('/api/register').send(invalidUser)
          expect(response.status).toBe(404)
     })

     test('should return an error for invalid password',async()=>{
          const invalidUser = {
               username:'naren__',
               email:'naren@gmail.com',
               password:'1234567',
               confirmPassword:'1234567'
          }
          const response = await request(app).post('/api/register').send(invalidUser)
          expect(response.status).toBe(404)
     })
     test('should return an error for password and confirm password mismatch',async()=>{
          const invalidUser = {
               username:'naren__',
               email:'naren@gmail.com',
               password:'12345678',
               confirmPassword:'123456789'
          }
          const response = await request(app).post('/api/register').send(invalidUser)
          expect(response.status).toBe(404)
     })
     test('should return an error for already existing username',async()=>{
          const invalidUser = {
               username:'naren__',
               email:'naren00@gmail.com',
               password:'12345678',
               confirmPassword:'12345678'
          }
          const response = await request(app).post('/api/register').send(invalidUser)
          expect(response.status).toBe(404)
     })
     test('should return an error for already existing email',async()=>{
          const invalidUser = {
               username:'naren00',
               email:'naren@gmail.com',
               password:'12345678',
               confirmPassword:'12345678'
          }
          const response = await request(app).post('/api/register').send(invalidUser)
          expect(response.status).toBe(404)
     })
})

