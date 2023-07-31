import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './App.css'

function App() {

  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')

  useEffect( ()=> {
    async function fetchNotes() {
      const response = await fetch('http://localhost:3000/notes')
      const newNotes = await response.json();
      setNotes(newNotes)
    }
    fetchNotes()
  } , [])

  async function handleCreateNote (e){
    e.preventDefault();
    await fetch('http://localhost:3000/notes',{
      method:'POST',
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return setTitle('');
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
      <div className="notes">
        {notes.map((note) => 
        <div key={note._id}> 
        {note.title} 
        <FontAwesomeIcon icon={faTrash} />
        </div>)} 
      </div>
          
    </div>
  )
}

export default App
