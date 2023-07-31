

export default async function createNote( title ) {
    const response = await fetch('http://localhost:3000/notes',{
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
