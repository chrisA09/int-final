import { useEffect, useState } from 'react'
// import {  useState } from 'react'
import {  useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'
// import { Link } from "react-router-dom";
// import deleteNote from './API/deleteNote';
// import getNotes from './API/getNotes';
// import createNote from './API/createNote';
import createCard from './API/createCard';
import getCards from './API/getCards'
import './App.css'

function Note() {

  const [noteCards, setNoteCards] = useState([])
  const [cardContent, setCardContent] = useState('')
  let { noteId } = useParams();

 useEffect( ()=> {
   async function fetchNotes() {
     const newCard = await getCards(noteId)
     setNoteCards(newCard.cards) // corregir porque cards y note deben ir mezcladas.
   }
   fetchNotes()
 } , [noteId])

  async function handleCreateCard (e){
    e.preventDefault();
    const {cards} = await createCard(noteId,cardContent);
    setNoteCards(cards); 
    setCardContent('');
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
        value={cardContent}
        onChange={(e)=>{
          setCardContent(e.target.value)
        }}

      />
      <button>set cardContent</button>
    </form>
    {/* note tiene que ser un componente con estilos propios y pasarle props */}
      <div className="notes">
        {noteCards.map((card,i) => 
        <div key={i}> 
        {card}
        {/*<button onClick={()=>handleDeleteNote(note._id)}><FontAwesomeIcon icon={faTrash} /></button> */}
        </div>)} 
      </div>
          
    </div>
  )
}

export default Note