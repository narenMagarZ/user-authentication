import app from "./app"
import mongoose from "mongoose"
const PORT = process.env.PORT || 5000

process.on('uncaughtException',()=>{
     console.log('UNCAUGHT EXCEPTION...')
     process.exit(1)
})
const MONGDBURL = 'mongodb://127.0.0.1:27017/user'
mongoose.connect(process.env.MONGODB_URL||MONGDBURL)
.then(()=>{
     console.log('connected')
}).catch((err)=>{
     console.error(err)
})

const server = app.listen(PORT,()=>{
     console.log('server is listening on',PORT)
})

process.on('unhandledRejection',()=>{
     console.log('UNHANDLED REJECTION...')
     server.close(()=>{
          process.exit(1)
     })
})

