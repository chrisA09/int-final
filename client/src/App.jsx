import { useState } from 'react'
import './App.css'

function App() {

  const [title, setTitle] = useState('')

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
  )
}

export default App
