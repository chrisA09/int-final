

export default async function getNotes() {
    const response = await fetch('http://localhost:3000/notes')
    return response.json();
}
