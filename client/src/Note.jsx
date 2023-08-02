// import { useEffect, useState } from 'react'
import {  useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'
// import { Link } from "react-router-dom";
// import deleteNote from './API/deleteNote';
// import getNotes from './API/getNotes';
// import createNote from './API/createNote';
import createCard from './API/createCard';
// import './App.css'

function Note() {

  // const [notes, setNotes] = useState([])
  const [cardContent, setCardContent] = useState('')

  // useEffect( ()=> {
  //   async function fetchNotes() {
  //     const newNotes = await getNotes()
  //     setNotes(newNotes)
  //   }
  //   fetchNotes()
  // } , [])

  async function handleCreateCard (e){
    e.preventDefault();
    const card = await createCard(cardContent);
    console.log(card)
    // setNotes([...notes, note]);
    // setCardContent('');
  }
  // async function handleDeleteNote (noteId){
  //     deleteNote(noteId)
  //     setNotes(notes.filter((note)=> note._id !== noteId));
  // }

  return (
    <div className='app'>
      <form onSubmit={handleCreateCard}>
      <label htmlFor="create-card">Create Card</label>
      <input  
        id='create-card'
        value={cardContent}// input que tiene como value al estado "title". que este mismo tiene como valor incial un string vacio('').
        onChange={(e)=>{
          setCardContent(e.target.value)
        }}

      />
      <button>set cardContent</button>
    </form>
    {/* note tiene que ser un componente con estilos propios y pasarle props */}
      {/* <div className="cards">
        {cards.map((card) => 
        <div key={note._id}> 
        <li> {card.cardContent} </li>
        <Link to={`notes/${note._id}`}>{note.title}</Link>
        <button onClick={()=>handleDeleteNote(note._id)}><FontAwesomeIcon icon={faTrash} /></button>
        </div>)} 
      </div> */}
          
    </div>
  )
}

export default Note