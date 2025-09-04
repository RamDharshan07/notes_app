import React, { useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <button 
      onClick={()=>setModelOpen(true)}
      className="bg-teal-500 text-white text-2xl font-bold p-4 rounded-full fixed right-4 bottom-4 ">
        +
      </button>
      {isModelOpen && <NoteModel />}
    </div>
  );
};

export default Home;
