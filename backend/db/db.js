import mongoose from "mongoose"

const connection=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/note_app");
        console.log("Connected to mongodb");
    }
    catch(err)
    {
        console.log("Error connecting to mongodb",error.message);    
    }
}
export default connection;