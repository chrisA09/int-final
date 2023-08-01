import Note from '../models/Note.js';

export async function createNoteController(req, res) {
	//se crea una nueva instancia del objeto definido en el modelo Note.js

	const newNote = new Note({
		title: req.body.title,
	});

	//almacena la respuesta en una variable y la guarda en la db
	const createdNote = await newNote.save();

	//devuelve la nota creada pero en formato json
	res.json(createdNote);
}
