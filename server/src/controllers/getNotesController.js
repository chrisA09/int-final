import Note from '../models/Note.js';

export async function getNotesController(req, res) {
	const notes = await Note.find(); //accedo a la coleccion de la mmisma manera que model(por mas que la coleccion se llame notes)
	res.json(notes);
}
