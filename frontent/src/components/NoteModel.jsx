import React, { useState } from 'react'

const NoteModel = () => {
    const [title,settitle]=useState("");
    const [description,setdescription]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
    }
  return (
    <div className='flex justify-center items-center mt-[10rem]'>
       

      <div  className='flex flex-col gap-5 bg-white w-[21rem] h-[20rem] p-10 items-center justify-center'>

        <h1 className='text-2xl font-bold'>Add New Note</h1>
        <form className='flex flex-col gap-5'
        onSubmit={handleSubmit}
        >
        <input 
        type="text"
        value={title}
        onChange={(e)=>settitle(e.target.value)}
        className='w-50 p-2 border border-green-500'
        placeholder='Enter title'
        />
        <input 
        type="text"
        value={description}
        onChange={(e)=>setdescription(e.target.value)}
        className='w-50 h-20 p-2 border border-green-400'
        placeholder='Enter description'
        
        />
        <div className='flex gap-3'>

        <button className='bg-teal-500 p-3 w-25'>
            Create
        </button>
        <button className='bg-red-500 p-3 w-25'>
            Cancle
        </button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default NoteModel
