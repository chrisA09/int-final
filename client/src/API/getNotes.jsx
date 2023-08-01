import { API_URL } from "./config";


export default async function getNotes() {
    const response = await fetch(`${API_URL}/notes`)
    return response.json();
}
