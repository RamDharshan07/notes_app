import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import axios from "axios";
import NoteCard from "../components/NoteCard";
const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [notes,setNotes]=useState([])
  const [currentNote,setcurrenNote]=useState(null);
  const closemodel=()=>{
    setModelOpen(false);
  }
  useEffect(()=>{
    fetchNotes();
  },[])
  const fetchNotes=async()=>{
      try{
        const {data}=await axios.get("http://localhost:5000/api/note")
        setNotes(data.notes)
      }
      catch(err)
      {
        console.log(err)
      }
    }
    const onEdit=(note)=>{

      setcurrenNote(note);
      setModelOpen(true)

    }
  const addNote=async({title,description})=>{
    try{
          const response = await axios.post(
            "http://localhost:5000/api/note/add",
            {
              title,
              description,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              },
            }
          );
          if(response.data.success)
          {
            fetchNotes();
            closemodel();
            
          }
        }
        catch(err)
        {
          console.log(err);
          
        }
  }
        const editNote=async({id,title,description})=>{
         try{
          const response = await axios.put(
            `http://localhost:5000/api/note/${id}`,
            {
              id,
              title,
              description,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              },
            }
          );
          if(response.data.success)
          {
            fetchNotes();
            closemodel();
            
          }
        }
        catch(err)
        {
          console.log(err);
          
        }
        }
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="px-8 pt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
        {
          notes.map(note=>
            (
              <NoteCard
              note={note}
              onEdit={onEdit}
              />
            )
          )
        }
      </div>

      <button 
      onClick={()=>setModelOpen(true)}
      className="bg-teal-500 text-white text-2xl font-bold p-4 rounded-full fixed right-4 bottom-4 ">
        +
      </button>
      {isModelOpen && 
      <NoteModel  
      closemodel={closemodel}
      addNote={addNote}
      currentNote={currentNote}
      editNote={editNote}
      />}
    </div>
  );
};

export default Home;
