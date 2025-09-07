import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();

const connection=async()=>{
    try{
        await mongoose.connect(process.env.Mongo_Uri);
        console.log("Connected to mongodb");
    }
    catch(err)
    {
        console.log("Error connecting to mongodb",err);    
    }
}
export default connection;