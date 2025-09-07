import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import axios from "axios";
import NoteCard from "../components/NoteCard";
const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [notes,setNotes]=useState([])
  const [currentNote,setcurrenNote]=useState(null);
  const [query,setquery]=useState("")
  const [filterNotes,setfilterNotes]=useState(false)
  const closemodel=()=>{
    setModelOpen(false);
  }
  useEffect(()=>{
    fetchNotes();
  },[])
  const fetchNotes=async()=>{
      try{
        const {data}=await axios.get("http://localhost:5000/api/note",{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
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
        const deleteNote = async(id)=>{
          try{
          const response = await axios.delete(
            `http://localhost:5000/api/note/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              },
            }
          );
          if(response.data.success)
          {
            fetchNotes();
            
            
          }
        }
        catch(err)
        {
          console.log(err);
          
        }
        }
        //search functionality
        useEffect(()=>{
          setfilterNotes(
            notes.filter((note)=>note.title.toLowerCase().includes(query.toLowerCase()))
          ||notes.filter((note)=>note.title.toLowerCase().includes(query.toLowerCase()))

          )

        },[query,notes])
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar
      setquery={setquery}
      />

      <div className="px-8 pt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
        {
          filterNotes.length>0 ? filterNotes.map(note=>
            (
              <NoteCard
              note={note}
              onEdit={onEdit}
              deleteNote={deleteNote}
              />
            )
          ):<p>no notes</p>
        }
      </div>

      <button 
      onClick={()=>{
        setModelOpen(null)
        setModelOpen(true)
      }
      }
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
