import { API_URL } from "./config";


export default async function getNote (noteId) {
    const response = await fetch(`${API_URL}/notes/${noteId}`)
    return response.json();
}
