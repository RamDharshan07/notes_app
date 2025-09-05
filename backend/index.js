import express from "express"
import cors from 'cors'
import connection from "./db/db.js"
const app=express()

import authRouter from './routes/auth.js'
import noteRouter from './routes/note.js'
app.use(cors());
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/note',noteRouter)


app.listen(5000,()=>{
    connection();   
    console.log("Srveri is running");
    
})