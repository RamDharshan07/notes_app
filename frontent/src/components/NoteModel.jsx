import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

const NoteModel = ({closemodel,addNote,currentNote,editNote}) => {
    const [title,settitle]=useState("");
    const [description,setdescription]=useState("");
    const navigate = useNavigate();
    
    useEffect(()=>{
  if(currentNote) {
    settitle(currentNote.title)
    setdescription(currentNote.description)
  } else {
    settitle("")
    setdescription("")
  }
},[currentNote])


    console.log(currentNote);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(currentNote)
        {
         editNote({id: currentNote._id, title, description})
        }
        else{

          addNote({title,description})
        }

         
    }
  return (
  // <div className="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-center z-50">
    <div className="fixed inset-0 bg-white/30  flex justify-center items-center z-50">

    <div className="flex flex-col gap-5 bg-white w-[21rem] h-[20rem] p-10 rounded-xl shadow-lg items-center justify-center">
      <h1 className="text-2xl font-bold">
        {currentNote ? "Edit Note" : "Add New Note"}
      </h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="w-50 p-2 border border-green-500"
          placeholder="Enter title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          className="w-50 h-20 p-2 border border-green-400"
          placeholder="Enter description"
        />
        <div className="flex gap-3">
          <button className="bg-teal-500 p-3 w-25 text-white rounded">
            {currentNote ? "Edit" : "Create"}
          </button>
          <button
            type="button"
            onClick={closemodel}
            className="bg-red-500 p-3 w-25 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);

}

export default NoteModel
