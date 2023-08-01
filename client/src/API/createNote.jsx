import { API_URL } from "./config";


export default async function createNote( title ) {
    const response = await fetch(`${API_URL}/notes`,{
        method:'POST',
        body: JSON.stringify({
          title,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json()
}
