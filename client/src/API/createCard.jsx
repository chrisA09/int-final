import { API_URL } from "./config";

export default async function createCard( noteId,cardContent ) {
    const response = await fetch(`${API_URL}/notes/${noteId}/cards`,{
        method:'POST',
        body: JSON.stringify({
          cardContent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json()
}
