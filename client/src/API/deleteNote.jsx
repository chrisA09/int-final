

export default async function deleteNote(noteId) {
    await fetch(`http://localhost:3000/notes/${noteId}`,{
        method:'DELETE',
        });
}
