import express from "express"
import cors from 'cors'
import connection from "./db/db.js"
const app=express()

import authRouter from './routes/auth.js'

app.use(cors());
app.use(express.json())
app.use('/api/auth',authRouter)


app.listen(5000,()=>{
    connection();   
    console.log("Srveri is running");
    
})