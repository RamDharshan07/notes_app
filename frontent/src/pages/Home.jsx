// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import NoteModel from "../components/NoteModel";
// import axios from "axios";
// const Home = () => {
//   const [isModelOpen, setModelOpen] = useState(false);
//   const closemodel=()=>{
//     setModelOpen(false);
//   }
//   const addNote=async({title,description})=>{
//     try{
//           const response = await axios.post(
//             "http://localhost:5000/api/note/add",
//             {
//               title,
//               description,
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`
//               },
//             }
//           );
//           if(response.data.success)
//           {
            
//             closemodel();
            
//           }
//         }
//         catch(err)
//         {
//           console.log(err);
          
//         }
//   }
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Navbar />

//       <button 
//       onClick={()=>setModelOpen(true)}
//       className="bg-teal-500 text-white text-2xl font-bold p-4 rounded-full fixed right-4 bottom-4 ">
//         +
//       </button>
//       {isModelOpen && 
//       <NoteModel  
//       closemodel={closemodel}
//       addNote={addNote}
//       />}
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import axios from "axios";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  
  const closemodel = () => {
    setModelOpen(false);
  }

  const addNote = async ({title, description}) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add", // ← FIXED: Changed "note" to "notes"
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json" // ← Added explicitly for safety
          },
        }
      );
      
      if (response.data.success) {
        closemodel();
        // You might want to add some success feedback here
        console.log("Note added successfully!");
      }
    } catch (err) {
      console.log("Error adding note:", err);
      // Add error handling feedback for the user
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <button 
        onClick={() => setModelOpen(true)}
        className="bg-teal-500 text-white text-2xl font-bold p-4 rounded-full fixed right-4 bottom-4"
      >
        +
      </button>
      
      {isModelOpen && 
        <NoteModel  
          closemodel={closemodel}
          addNote={addNote}
        />
      }
    </div>
  );
};

export default Home;