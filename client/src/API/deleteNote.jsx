import { API_URL } from "./config";


export default async function deleteNote(noteId) {
    await fetch(`${API_URL}/notes/${noteId}`,{
        method:'DELETE',
        });
}
