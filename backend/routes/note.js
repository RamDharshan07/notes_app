import express from "express"
import Note from "../models/Note.js";
import middleware from "../middleware/middleware.js";

const router=express.Router()
router.use(express.json());
router.post('/add',middleware,async(req,res)=>{

    try{
        const {title,description}=req.body
        const newNote=new Note({
            title,
            description,
            userId:req.user.id
        })
        await newNote.save();
        console.log(newNote)
        return res.status(200)
        .json({success:true,message:"Note created successfully"})

    }catch(err)
    {
        console.log(err,"no note ,error in adding note");
         return res.status(500).json({success:false, message:"Server error"});
    }

})

router.get('/',async(req,res)=>{
    try{
        const notes=await Note.find()
        return res.status(200).json({success:true,notes})

    }
    catch(err)
    {
        return res.status(500).json({success:false,message:"cant retrive noets"})
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const updateNote=await Note.findByIdAndUpdate(id,req.body)
        return res.status(200).json({success:true,updateNote})

    }
    catch(err)
    {
        return res.status(500).json({success:false,message:"cant updata noets"})
    }
})

export default router
