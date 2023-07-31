import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import deleteNote from './API/deleteNote';
import getNotes from './API/getNotes';
import createNote from './API/createNote';
import './App.css'

function App() {

  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')

  useEffect( ()=> {
    async function fetchNotes() {
      const newNotes = await getNotes()
      setNotes(newNotes)
    }
    fetchNotes()
  } , [])

  async function handleCreateNote (e){
    e.preventDefault();
    const note = await createNote(title);
    setNotes([...notes, note]);
    setTitle('');
  }
  async function handleDeleteNote (noteId){
      deleteNote(noteId)
      setNotes(notes.filter((note)=> note._id !== noteId));
  }

  return (
    <div className='app'>
      <form onSubmit={handleCreateNote}>
      <label htmlFor="note-title">Note Title</label>
      <input  
        id='note-title'
        value={title}// input que tiene como value al estado "title". que este mismo tiene como valor incial un string vacio('').
        onChange={(e)=>{
          setTitle(e.target.value)
        }}

      />
      <button>set title</button>
    </form>
    {/* note tiene que ser un componente con estilos propios y pasarle props */}
      <div className="notes">
        {notes.map((note) => 
        <div key={note._id}> 
        <Link to={`notes/${note._id}`}>{note.title}</Link>
        <button onClick={()=>handleDeleteNote(note._id)}><FontAwesomeIcon icon={faTrash} /></button>
        </div>)} 
      </div>
          
    </div>
  )
}

export default App
